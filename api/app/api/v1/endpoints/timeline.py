from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ....core.database import get_db, supabase
from ....models.timeline import Timeline
from ....schemas.timeline import TimelineCreate, TimelineResponse

router = APIRouter()

@router.post("/", response_model=TimelineResponse)
async def create_timeline_event(
    project_id: int,
    timeline: TimelineCreate,
    db: Session = Depends(get_db)
):
    try:
        # Create in PostgreSQL
        db_timeline = Timeline(
            project_id=project_id,
            **timeline.dict()
        )
        db.add(db_timeline)
        db.commit()
        db.refresh(db_timeline)

        # Sync to Supabase
        supabase_data = {
            "id": db_timeline.id,
            "project_id": project_id,
            "title": timeline.title,
            "description": timeline.description,
            "event_date": timeline.event_date.isoformat(),
            "event_type": timeline.event_type
        }
        
        supabase.table("project_timeline").insert(supabase_data).execute()
        
        return db_timeline
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{project_id}", response_model=List[TimelineResponse])
async def get_project_timeline(project_id: int, db: Session = Depends(get_db)):
    try:
        # Try Supabase first
        response = supabase.table("project_timeline")\
            .select("*")\
            .eq("project_id", project_id)\
            .execute()
        
        if response.data:
            return response.data
        
        # Fallback to PostgreSQL
        timeline_events = db.query(Timeline)\
            .filter(Timeline.project_id == project_id)\
            .all()
        
        return timeline_events
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 