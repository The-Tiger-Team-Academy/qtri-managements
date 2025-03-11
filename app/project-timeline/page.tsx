'use client';

import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../components/ui/table";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Plus } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
// Project data type
interface Project {
  id: string;
  name: string;
  keyPersons?: string;
  progress: number;
  deadline: string;
  daysRemaining: number;
  status: 'onTime' | 'nearDeadline' | 'overdue' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}

export default function ProjectTimeline() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeYear, setActiveYear] = useState("2025");
  const [displayCount, setDisplayCount] = useState<number | 'all'>(3);
  const [sortBy, setSortBy] = useState<'deadline' | 'progress'>('deadline');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/api/projects`);
        
        console.log(response.data);
        // แปลงข้อมูลจาก API ให้ตรงกับ interface Project
        const formattedProjects = response.data.map((project: any) => ({
          id: project.id,
          name: project.title || project.name,
          keyPersons: project.keyPersons,
          progress: project.progress,
          deadline: project.deadline,
          daysRemaining: project.daysRemaining,
          // กำหนดสถานะตามเงื่อนไข
          status: getProjectStatus(project.progress, project.daysRemaining),
          createdAt: project.createdAt,
          updatedAt: project.updatedAt
        }));
        
        setProjects(formattedProjects);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // ฟังก์ชันสำหรับการเพิ่มโปรเจกต์ใหม่
  const handleAddProject = async (project: Project) => {
    try {
      setIsSaving(true);
      
      // Format the project data to match the curl example format
      const projectToAdd = {
        name: project.name,
        keyPersons: project.keyPersons || '',
        progress: project.progress,
        deadline: project.deadline,
        daysRemaining: project.daysRemaining,
        status: project.status,
      };
      
      // Send data to API using the format from the curl example
      const response = await axios.post(`${baseUrl}/api/projects`, projectToAdd);
      
      console.log('Project added:', response.data);

      // Update projects list with the response
      setProjects(prev => [...prev, response.data]);
      
      // Close modal
      setIsAddingNew(false);
      
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // ฟังก์ชันสำหรับการแก้ไขโปรเจกต์
  const handleSave = async (project: Project) => {
    try {
      setIsSaving(true);
      
      // อัพเดต timestamp
      const projectToUpdate = {
        ...project,
        updatedAt: new Date().toISOString()
      };
      
      // ส่งข้อมูลไปยัง API
      const response = await axios.put(`${baseUrl}/api/projects/${project.id}`, projectToUpdate);
      
      // อัพเดตรายการโปรเจกต์
      setProjects(prev => prev.map(p => p.id === project.id ? response.data : p));
      
      // ปิด modal
      setSelectedProject(null);
      
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // ฟังก์ชันกำหนดสถานะของโปรเจกต์
  const getProjectStatus = (progress: number, daysRemaining: number): Project['status'] => {
    if (progress >= 100) return 'completed';
    if (daysRemaining < 0) return 'overdue';
    if (daysRemaining <= 14) return 'nearDeadline';
    return 'onTime';
  };

  // ฟังก์ชันสำหรับแสดงสีของ Progress bar
  const getProgressColor = (progress: number) => {
    if (progress < 25) return "bg-red-500";
    if (progress < 50) return "bg-yellow-500";
    if (progress < 80) return "bg-blue-500";
    return "bg-green-500";
  };

  // ฟังก์ชันสำหรับแสดงสีของสถานะ
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'overdue':
        return "bg-red-100 text-red-800 border-red-300";
      case 'nearDeadline':
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case 'completed':
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  // ฟังก์ชันสำหรับแสดงข้อความสถานะ
  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'overdue':
        return "Overdue";
      case 'nearDeadline':
        return "Near Deadline (within 14 days)";
      case 'completed':
        return "Completed";
      default:
        return "In Progress";
    }
  };

  // ฟังก์ชันสำหรับแสดงสีพื้นหลังของแถว
  const getRowBackground = (name: string) => {
    const specialProjects = [
      "Korea Commercial Collaboration",
      "Quick-win manpower/ upskill-reskill/ PMU B",
      "Legal platform for international collaboration"
    ];
    
    return specialProjects.includes(name) ? "bg-yellow-50" : "";
  };

  // ฟังก์ชันสำหรับดึงเดือนจาก deadline
  const getDeadlineMonth = (deadline: string): number => {
    // รูปแบบ deadline: "31 Mar 2025"
    const months = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    
    const parts = deadline.split(' ');
    if (parts.length >= 2) {
      const monthStr = parts[1];
      return months[monthStr as keyof typeof months] || 0;
    }
    
    return 0;
  };

  // Filter projects based on year and search query
  const filteredProjects = projects.filter(project => {
    const matchesYear = project.deadline.includes(activeYear);
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (project.keyPersons?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                         project.status.toString().includes(searchQuery.toLowerCase());
    
    return matchesYear && matchesSearch;
  });

  // Sort projects
  const getSortedProjects = () => {
    const sorted = [...filteredProjects].sort((a, b) => {
      if (sortBy === 'deadline') {
        return a.daysRemaining - b.daysRemaining; // เรียงตาม daysRemaining จากน้อยไปมาก
      } else {
        return b.progress - a.progress;
      }
    });
    
    // จำกัดจำนวนโปรเจกต์ที่แสดง
    return displayCount === 'all' ? sorted : sorted.slice(0, displayCount);
  };

  // Add this function to handle project deletion
  const handleDeleteProject = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }
    
    try {
      setIsSaving(true);
      
      // Send delete request to API
      await axios.delete(`${baseUrl}/api/projects/${projectId}`);
      
      // Remove project from state
      setProjects(prev => prev.filter(p => p.id !== projectId));
      
      // Close the edit modal
      setSelectedProject(null);
      
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Project Timeline</h1>
        <Button 
          onClick={() => setIsAddingNew(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>
      
      <Tabs defaultValue="2025">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="2025">2025</TabsTrigger>
            <TabsTrigger value="2026">2026</TabsTrigger>
            <TabsTrigger value="2027">2027</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'deadline' | 'progress')}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="progress">Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Display:</span>
              <Select 
                value={displayCount.toString()} 
                onValueChange={(value) => setDisplayCount(value === 'all' ? 'all' : parseInt(value))}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Display count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">Top 3</SelectItem>
                  <SelectItem value="5">Top 5</SelectItem>
                  <SelectItem value="10">Top 10</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Input 
                placeholder="Search projects..." 
                className="w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <TabsContent value="2025" className="mt-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">{error}</div>
          ) : filteredProjects.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No projects found</div>
          ) : (
            <div className="space-y-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Projects</TableHead>
                    <TableHead className="w-[200px]">Key persons</TableHead>
                    <TableHead className="w-[200px]">Progress</TableHead>
                    <TableHead className="w-[150px]">Deadline</TableHead>
                    {/* Month columns with equal width */}
                    {Array.from({ length: 12 }, (_, i) => (
                      <TableHead key={i} className="p-1 text-center w-[40px]">
                        {i + 1}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getSortedProjects().map((project) => (
                    <TableRow 
                      key={project.id} 
                      className={`cursor-pointer ${getRowBackground(project.name)}`}
                      onClick={() => setSelectedProject(project)}
                    >
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{project.keyPersons || '-'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-[100px] bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${getProgressColor(project.progress)}`} 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{project.progress}%</span>
                          {/* Add status badge next to progress */}
                          <Badge variant="outline" className={`ml-2 ${getStatusColor(project.status)}`}>
                            {getStatusText(project.status)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{project.deadline}</div>
                          <div className="text-sm text-gray-500">{project.daysRemaining} days remaining</div>
                        </div>
                      </TableCell>
                      
                      {/* Month columns with equal width */}
                      {Array.from({ length: 12 }, (_, i) => {
                        const deadlineMonth = getDeadlineMonth(project.deadline);
                        const isDeadlineMonth = i === deadlineMonth;
                        
                        return (
                          <TableCell key={i} className="p-1 text-center w-[40px]">
                            {isDeadlineMonth && (
                              <div className="flex flex-col items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                                  <div 
                                    className={`h-2 rounded-full ${getProgressColor(project.progress)}`} 
                                    style={{ width: `${project.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs">{project.progress}%</span>
                              </div>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {/* แสดงปุ่ม "Show All" เมื่อไม่ได้แสดงทั้งหมด */}
              {displayCount !== 'all' && filteredProjects.length > displayCount && (
                <div className="flex justify-center mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setDisplayCount('all')}
                  >
                    Show All ({filteredProjects.length} projects)
                  </Button>
                </div>
              )}
              
              <div className="flex justify-between items-start mt-8 text-sm">
                <div>
                  <h3 className="text-sm font-semibold mb-2">Progress Color Legend:</h3>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm bg-red-500"></div>
                      <span className="text-sm">0-24%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm bg-yellow-500"></div>
                      <span className="text-sm">25-49%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm bg-blue-500"></div>
                      <span className="text-sm">50-79%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm bg-green-500"></div>
                      <span className="text-sm">80-100%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold mb-2">Deadline Status:</h3>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                        Overdue
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                        Near Deadline (within 14 days)
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="2026" className="mt-4">
          <div className="p-8 text-center text-gray-500">
            Project data for 2026 will be added when planning is complete
          </div>
        </TabsContent>
        
        <TabsContent value="2027" className="mt-4">
          <div className="p-8 text-center text-gray-500">
            Project data for 2027 will be added when planning is complete
          </div>
        </TabsContent>
      </Tabs>

      {/* Add New Project Sheet */}
      {isAddingNew && (
        <Sheet open={isAddingNew} onOpenChange={setIsAddingNew}>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Add New Project</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <ProjectForm
                project={{
                  id: String(projects.length + 1),
                  name: '',
                  progress: 0,
                  deadline: '',
                  daysRemaining: 0,
                  status: 'onTime'
                }}
                onSave={handleAddProject}
                isSaving={isSaving}
              />
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Edit Project Sheet */}
      {selectedProject && (
        <Sheet open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Edit Project</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <ProjectForm
                project={selectedProject}
                onSave={handleSave}
                onDelete={handleDeleteProject}
                isSaving={isSaving}
              />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}

// Component for project form
function ProjectForm({ 
  project, 
  onSave, 
  onDelete,
  isSaving = false 
}: { 
  project: Project, 
  onSave: (project: Project) => void,
  onDelete?: (projectId: string) => void,
  isSaving?: boolean
}) {
  const [formData, setFormData] = useState(project);
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(
    project.deadline ? new Date(project.deadline) : null
  );
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate days remaining
    const today = new Date();
    const deadline = deadlineDate || today;
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Determine the status based on conditions
    let projectStatus: 'onTime' | 'nearDeadline' | 'overdue' | 'completed';
    
    if (formData.progress >= 100) {
      projectStatus = 'completed';
    } else if (diffDays < 0) {
      projectStatus = 'overdue';
    } else if (diffDays <= 14) {
      projectStatus = 'nearDeadline';
    } else {
      projectStatus = 'onTime';
    }
    
    const updatedProject = {
      ...formData,
      deadline: deadlineDate ? deadlineDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }) : '',
      daysRemaining: diffDays,
      status: projectStatus
    };
    
    onSave(updatedProject);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Project Name</label>
        <Input 
          value={formData.name} 
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Key Persons</label>
        <Input 
          value={formData.keyPersons || ''} 
          onChange={(e) => setFormData({...formData, keyPersons: e.target.value})}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Progress (%)</label>
        <Input 
          type="number" 
          min="0"
          max="100"
          value={formData.progress} 
          onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value)})}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Deadline</label>
        <DatePicker
          selected={deadlineDate}
          onChange={(date) => setDeadlineDate(date)}
          dateFormat="dd MMM yyyy"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div className="pt-4 flex gap-2">
        <Button 
          type="submit" 
          className="flex-1 bg-purple-600 hover:bg-purple-700"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Saving...
            </>
          ) : (
            'Save Project'
          )}
        </Button>
        
        {onDelete && (
          <Button 
            type="button"
            variant="destructive"
            onClick={() => onDelete(project.id)}
            disabled={isSaving}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        )}
      </div>
    </form>
  );
} 