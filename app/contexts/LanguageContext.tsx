'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// ประเภทข้อมูลสำหรับคำแปล
type Translations = {
  [key: string]: {
    th: string;
    en: string;
  };
};

// คำแปลสำหรับใช้ในแอพพลิเคชัน
const translations: Translations = {
  // เมนู
  dashboard: {
    th: 'แดชบอร์ด',
    en: 'Dashboard',
  },
  calendar: {
    th: 'ปฏิทิน',
    en: 'Calendar',
  },
  team: {
    th: 'ทีมงาน',
    en: 'Team',
  },
  reports: {
    th: 'รายงาน',
    en: 'Reports',
  },
  settings: {
    th: 'ตั้งค่า',
    en: 'Settings',
  },
  
  // หน้า Project Timeline
  projectTimeline: {
    th: 'ไทม์ไลน์โปรเจค',
    en: 'Project Timeline',
  },
  addNewProject: {
    th: 'เพิ่มโปรเจคใหม่',
    en: 'Add New Project',
  },
  editProject: {
    th: 'แก้ไขโปรเจค',
    en: 'Edit Project',
  },
  projectName: {
    th: 'ชื่อโปรเจค',
    en: 'Project Name',
  },
  keyPersons: {
    th: 'ผู้รับผิดชอบหลัก',
    en: 'Key Persons',
  },
  progress: {
    th: 'ความคืบหน้า',
    en: 'Progress',
  },
  deadline: {
    th: 'กำหนดส่ง',
    en: 'Deadline',
  },
  daysRemaining: {
    th: 'อีก {days} วัน',
    en: '{days} days left',
  },
  status: {
    th: 'สถานะ',
    en: 'Status',
  },
  selectDate: {
    th: 'เลือกวันที่',
    en: 'Select date',
  },
  cancel: {
    th: 'ยกเลิก',
    en: 'Cancel',
  },
  save: {
    th: 'บันทึก',
    en: 'Save',
  },
  delete: {
    th: 'ลบ',
    en: 'Delete',
  },
  confirmDelete: {
    th: 'ยืนยันการลบโปรเจค',
    en: 'Confirm Project Deletion',
  },
  confirmDeleteMessage: {
    th: 'คุณแน่ใจหรือไม่ว่าต้องการลบโปรเจคนี้? การกระทำนี้ไม่สามารถเรียกคืนได้',
    en: 'Are you sure you want to delete this project? This action cannot be undone.',
  },
  statusOnTime: {
    th: 'อยู่ระหว่างดำเนินการ',
    en: 'On Time',
  },
  statusNearDeadline: {
    th: 'ใกล้ถึงกำหนด',
    en: 'Near Deadline',
  },
  statusOverdue: {
    th: 'เลยกำหนด',
    en: 'Overdue',
  },
  statusCompleted: {
    th: 'เสร็จสิ้น',
    en: 'Completed',
  },
  nearDeadlineDesc: {
    th: 'ใกล้ถึงกำหนด (ภายใน 14 วัน)',
    en: 'Near Deadline (within 14 days)',
  },
  noData2026: {
    th: 'ข้อมูลโครงการปี 2026 จะถูกเพิ่มเมื่อมีการวางแผน',
    en: 'Project data for 2026 will be added when planning is complete',
  },
  noData2027: {
    th: 'ข้อมูลโครงการปี 2027 จะถูกเพิ่มเมื่อมีการวางแผน',
    en: 'Project data for 2027 will be added when planning is complete',
  },
};

// สร้าง Context สำหรับภาษา
type LanguageContextType = {
  language: 'th' | 'en';
  setLanguage: (lang: 'th' | 'en') => void;
  t: (key: string, params?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider สำหรับ Context
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'th' | 'en'>('th');

  // โหลดค่าภาษาจาก localStorage เมื่อคอมโพเนนต์โหลด
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'th' | 'en';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // ฟังก์ชันสำหรับแปลข้อความ
  const t = (key: string, params?: Record<string, string | number>): string => {
    const translation = translations[key]?.[language] || key;
    
    if (params) {
      return Object.entries(params).reduce((acc, [paramKey, paramValue]) => {
        return acc.replace(`{${paramKey}}`, String(paramValue));
      }, translation);
    }
    
    return translation;
  };

  // ฟังก์ชันสำหรับรับฟัง event การเปลี่ยนภาษาจาก NavBar
  useEffect(() => {
    const handleLanguageChange = () => {
      const savedLanguage = localStorage.getItem('language') as 'th' | 'en';
      if (savedLanguage && savedLanguage !== language) {
        setLanguage(savedLanguage);
      }
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook สำหรับใช้งาน Context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 