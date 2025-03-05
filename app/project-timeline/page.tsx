'use client';

import React, { useState } from 'react';
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

// Sample project data
const projectsData: Project[] = [
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
];

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

export default function ProjectTimeline() {
  const [activeYear, setActiveYear] = useState("2025");
  const [displayCount, setDisplayCount] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState<'deadline' | 'progress'>('deadline');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // ฟังก์ชันสำหรับเรียงลำดับโปรเจค
  const getSortedProjects = () => {
    const sorted = [...projectsData].sort((a, b) => {
      if (sortBy === 'deadline') {
        return a.daysRemaining - b.daysRemaining;
      } else {
        return b.progress - a.progress;
      }
    });
    
    if (displayCount === 'all') {
      return sorted;
    }
    return sorted.slice(0, displayCount);
  };

  const handleSave = (project: Project) => {
    // TODO: Implement save logic
    console.log('Saving project:', project);
  };

  const ProjectForm = ({ project, onSave }: { project: Project, onSave: (project: Project) => void }) => {
    const [formData, setFormData] = useState(project);
    
    // Convert string date to Date object
    const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
      const parts = project.deadline.split(" ");
      if (parts.length === 3) {
        const months: { [key: string]: number } = {
          "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
          "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
        };
        return new Date(
          parseInt(parts[2]),
          months[parts[1]],
          parseInt(parts[0])
        );
      }
      return null;
    });

    // Function to format date to string
    const formatDate = (date: Date): string => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    // Handle date change
    const handleDateChange = (date: Date | null) => {
      setSelectedDate(date);
      if (date) {
        setFormData({
          ...formData,
          deadline: formatDate(date),
          // Calculate days remaining
          daysRemaining: Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        });
      }
    };

    return (
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Project Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Key Persons</label>
          <Input
            value={formData.keyPersons || ''}
            onChange={(e) => setFormData({ ...formData, keyPersons: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Progress (%)</label>
          <Input
            type="number"
            min="0"
            max="100"
            value={formData.progress}
            onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Deadline</label>
          <div className="relative">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="d MMM yyyy"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholderText="Select deadline"
            />
          </div>
        </div>
        <Button className="w-full" onClick={() => onSave(formData)}>
          Save
        </Button>
      </div>
    );
  };

  return (
    <div className="p-6" style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Project Timeline</h1>
        <div className="flex space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add New Project</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 mt-4">
                <ProjectForm
                  project={{
                    id: String(projectsData.length + 1),
                    name: '',
                    progress: 0,
                    deadline: '',
                    daysRemaining: 0,
                    status: 'onTime'
                  }}
                  onSave={handleSave}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex gap-4 mb-6">
        <Select
          value={displayCount.toString()}
          onValueChange={(value: string) => setDisplayCount(value === 'all' ? 'all' : parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="จำนวนที่แสดง" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">แสดงทั้งหมด</SelectItem>
            <SelectItem value="3">3 อันดับแรก</SelectItem>
            <SelectItem value="5">5 อันดับแรก</SelectItem>
            <SelectItem value="10">10 อันดับแรก</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sortBy}
          onValueChange={(value: 'deadline' | 'progress') => setSortBy(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="เรียงตาม" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="deadline">เรียงตามกำหนดส่ง</SelectItem>
            <SelectItem value="progress">เรียงตามความคืบหน้า</SelectItem>
          </SelectContent>
        </Select>
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
                  <TableHead className="w-[250px]">Subprojects</TableHead>
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
                          // ตัวอย่างการแสดงแถบความคืบหน้าในเดือนที่เกี่ยวข้อง
                          // ในตัวอย่างนี้เราจะสุ่มแสดงในบางเดือน
                          const shouldShowProgress = 
                            (project.id === "1" && i === 2) || 
                            (project.id === "2" && (i === 5 || i === 7)) ||
                            (project.id === "3" && i === 5) ||
                            (project.id === "4" && i === 5) ||
                            (project.id === "5" && i === 7) ||
                            (project.id === "6" && i === 5) ||
                            (project.id === "10" && i === 9);
                          
                          return (
                            <TableCell key={i} className="p-1 text-center">
                              {shouldShowProgress && (
                                <Badge 
                                  className={`${getProgressColor(project.progress)} text-white`}
                                >
                                  {project.progress}%
                                </Badge>
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
    </div>
  );
} 