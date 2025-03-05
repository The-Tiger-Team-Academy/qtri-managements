import { NextResponse } from 'next/server'

export async function GET() {
  // ในสถานการณ์จริง คุณอาจจะดึงข้อมูลจากฐานข้อมูล
  // แต่ในตัวอย่างนี้เราจะใช้ข้อมูลตัวอย่าง
  const projects = [
    {
      id: '1',
      title: 'Korea Commercial Collaboration',
      subprojects: 'Market Research',
      keyPersons: 'James Lee',
      progress: 90,
      deadline: '31 Mar 2025',
      daysRemaining: 29
    },
    {
      id: '2',
      title: 'SQV Tours',
      subprojects: 'Tour Package Development',
      keyPersons: 'Din',
      progress: 65,
      deadline: '10 Apr 2025',
      daysRemaining: 39
    },
    {
      id: '3',
      title: 'QTRic Association',
      subprojects: 'Member Recruitment',
      keyPersons: 'Somchai T.',
      progress: 25,
      deadline: '15 Apr 2025',
      daysRemaining: 44
    },
    {
      id: '4',
      title: 'China-Thailand Hub for Clean Energy',
      subprojects: 'Initial Planning',
      keyPersons: 'K. Noi',
      progress: 30,
      deadline: '15 May 2025',
      daysRemaining: 74
    },
    {
      id: '5',
      title: 'Quick-win manpower/upskill-reskill/PMU B',
      subprojects: 'Training Program',
      keyPersons: 'Prasert W.',
      progress: 30,
      deadline: '30 May 2025',
      daysRemaining: 89
    },
    {
      id: '6',
      title: 'Education Sandbox (Brain power)',
      subprojects: 'Curriculum Development',
      keyPersons: 'A. Nick, A. Pruat',
      progress: 5,
      deadline: '15 Jun 2025',
      daysRemaining: 105
    },
    {
      id: '7',
      title: 'Legal platform for international collaboration',
      subprojects: 'Framework Development',
      keyPersons: 'Thanaporn L.',
      progress: 15,
      deadline: '30 Jun 2025',
      daysRemaining: 120
    },
    {
      id: '8',
      title: 'SEA Quantathon',
      subprojects: 'Event Planning',
      keyPersons: 'Pak Choong, Areeya, Sarat',
      progress: 70,
      deadline: '1 Feb 2025',
      daysRemaining: 121
    },
    {
      id: '9',
      title: 'Quantum Computing Workshop',
      subprojects: 'Material Preparation',
      keyPersons: 'Dr. Somsak',
      progress: 45,
      deadline: '5 Jul 2025',
      daysRemaining: 125
    },
    {
      id: '10',
      title: 'International Conference on Quantum Technology',
      subprojects: 'Speaker Invitation',
      keyPersons: 'Prof. Wanchai',
      progress: 20,
      deadline: '15 Aug 2025',
      daysRemaining: 166
    }
  ]

  return NextResponse.json(projects, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
} 