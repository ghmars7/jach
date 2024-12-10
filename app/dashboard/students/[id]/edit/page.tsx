"use client";

import EditStudentForm from '@/components/students/EditStudentForm'

export default function SettingPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Modifier</h2>
      </div>

      <EditStudentForm/>
    </div>
  );
}
