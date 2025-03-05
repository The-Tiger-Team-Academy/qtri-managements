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

// Project data type
interface Project {
  id: string;
  name: string;
  keyPersons?: string;
  progress: number;
  deadline: string;
  daysRemaining: number;
  status: 'onTime' | 'nearDeadline' | 'overdue' | 'completed';
}

export default function ProjectTimeline() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeYear, setActiveYear] = useState("2025");
  const [displayCount, setDisplayCount] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState<'deadline' | 'progress'>('deadline');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/projects');
        
        // แปลงข้อมูลจาก API ให้ตรงกับ interface Project
        const formattedProjects = response.data.map((project: any) => ({
          id: project.id,
          name: project.title || project.name,
          keyPersons: project.keyPersons,
          progress: project.progress,
          deadline: project.deadline,
          daysRemaining: project.daysRemaining,
          // กำหนดสถานะตามเงื่อนไข
          status: getProjectStatus(project.progress, project.daysRemaining)
        }));
        
        setProjects(formattedProjects);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
        // Use sample data if API fails
        setProjects([
          {
            id: "1",
            name: "QTRic Association",
            progress: 25,
            deadline: "15 Apr 2025",
            daysRemaining: 44,
            status: 'onTime'
          },
          {
            id: "2",
            name: "SEA Quantathon",
            keyPersons: "Pak Choong, Areeya, Sarat",
            progress: 70,
            deadline: "1 Feb 2025",
            daysRemaining: 121,
            status: 'onTime'
          },
          {
            id: "3",
            name: "QTRI2025",
            progress: 45,
            deadline: "5 Jul 2025",
            daysRemaining: 156,
            status: 'onTime'
          },
          {
            id: "4",
            name: "Korea Commercial Collaboration",
            keyPersons: "James Lee",
            progress: 90,
            deadline: "31 Mar 2025",
            daysRemaining: 29,
            status: 'nearDeadline'
          },
          {
            id: "5",
            name: "Education Sandbox (Brain power)",
            keyPersons: "A. Nick, A. Pruat",
            progress: 5,
            deadline: "15 Jun 2025",
            daysRemaining: 105,
            status: 'overdue'
          },
          {
            id: "6",
            name: "Quick-win manpower/ upskill-reskill/ PMU B",
            progress: 30,
            deadline: "30 May 2025",
            daysRemaining: 89,
            status: 'onTime'
          },
          {
            id: "7",
            name: "SQV Tours",
            keyPersons: "Din",
            progress: 65,
            deadline: "10 Apr 2025",
            daysRemaining: 39,
            status: 'onTime'
          },
          {
            id: "8",
            name: "China-Thailand Hub for Clean Energy Soluti K. Noi",
            progress: 30,
            deadline: "15 May 2025",
            daysRemaining: 74,
            status: 'onTime'
          },
          {
            id: "9",
            name: "IDEAL Philipines-Thailand",
            keyPersons: "Dylan",
            progress: 10,
            deadline: "1 Sep 2025",
            daysRemaining: 183,
            status: 'overdue'
          },
          {
            id: "10",
            name: "Legal platform for international collaboration",
            progress: 15,
            deadline: "30 Jun 2025",
            daysRemaining: 120,
            status: 'onTime'
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
        return a.daysRemaining - b.daysRemaining;
      } else {
        return b.progress - a.progress;
      }
    });
    
    if (displayCount === 'all') {
      return sorted;
    }
    
    return sorted.slice(0, displayCount as number);
  };

  // ฟังก์ชันสำหรับบันทึกการแก้ไขโปรเจกต์
  const handleSave = (updatedProject: Project) => {
    setProjects(prev => 
      prev.map(p => p.id === updatedProject.id ? updatedProject : p)
    );
    setSelectedProject(null);
    setIsAddingNew(false);
  };

  const ProjectForm = ({ project, onSave }: { project: Project, onSave: (project: Project) => void }) => {
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
      
      const updatedProject = {
        ...formData,
        deadline: deadlineDate ? deadlineDate.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }) : '',
        daysRemaining: diffDays,
        status: diffDays < 0 ? 'overdue' : 
                diffDays <= 14 ? 'nearDeadline' : 
                formData.progress >= 100 ? 'completed' : 'onTime'
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
        
        <div className="pt-4">
          <Button type="submit" className="w-full">Save Project</Button>
        </div>
      </form>
    );
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

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Project Timeline</h1>
        <Button 
          onClick={() => setIsAddingNew(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="w-full md:w-auto">
          <Select value={activeYear} onValueChange={setActiveYear}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2027">2027</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-auto">
          <Select 
            value={sortBy} 
            onValueChange={(value) => setSortBy(value as 'deadline' | 'progress')}
          >
            <SelectTrigger className="w-full md:w-60">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deadline">Sort by deadline</SelectItem>
              <SelectItem value="progress">Sort by progress</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <Input 
            placeholder="Search projects..." 
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="2025" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="2025">2025</TabsTrigger>
            <TabsTrigger value="2026">2026</TabsTrigger>
            <TabsTrigger value="2027">2027</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="onTime">On Time</SelectItem>
                <SelectItem value="nearDeadline">Near Deadline</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="relative">
              <Input
                type="text"
                placeholder="Search projects..."
                className="pl-8"
              />
              <svg
                className="absolute left-2 top-2.5 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        
        <TabsContent value="2025" className="mt-4">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Projects</TableHead>
                  <TableHead className="w-[200px]">Key persons</TableHead>
                  <TableHead className="w-[150px]">Progress</TableHead>
                  <TableHead className="w-[150px]">Deadline</TableHead>
                  <TableHead colSpan={12} className="text-center">
                    {activeYear}
                  </TableHead>
                </TableRow>
                <TableRow>
                  <TableHead colSpan={4}></TableHead>
                  {Array.from({ length: 12 }, (_, i) => (
                    <TableHead key={i} className="text-center">{i + 1}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {getSortedProjects().map((project) => (
                  <Sheet key={project.id}>
                    <SheetTrigger asChild>
                      <TableRow 
                        className={`${getRowBackground(project.name)} cursor-pointer hover:bg-gray-50`}
                        onClick={() => setSelectedProject(project)}
                      >
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>{project.keyPersons || ""}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={project.progress} 
                              className="h-2"
                              indicatorClassName={getProgressColor(project.progress)}
                            />
                            <span className="text-xs">{project.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            {project.deadline}
                            <div className="text-xs text-gray-500">
                              {project.daysRemaining > 0 
                                ? `${project.daysRemaining} days remaining`
                                : `${Math.abs(project.daysRemaining)} days overdue`
                              }
                            </div>
                          </div>
                        </TableCell>
                        {/* สร้างเซลล์สำหรับแต่ละเดือน */}
                        {Array.from({ length: 12 }, (_, i) => {
                          // ดึงเดือนจาก deadline
                          const deadlineMonth = getDeadlineMonth(project.deadline);
                          
                          // แสดง progress bar ในเดือนที่ตรงกับ deadline
                          const isDeadlineMonth = i === deadlineMonth;
                          
                          return (
                            <TableCell key={i} className="p-1 text-center">
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
                    </SheetTrigger>
                    <SheetContent side="right">
                      <SheetHeader>
                        <SheetTitle>Edit Project</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <ProjectForm project={project} onSave={handleSave} />
                      </div>
                    </SheetContent>
                  </Sheet>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-6 flex flex-col md:flex-row gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-2">Progress Legend:</h3>
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
                onSave={(newProject) => {
                  setProjects(prev => [...prev, newProject]);
                  setIsAddingNew(false);
                }}
              />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
} 