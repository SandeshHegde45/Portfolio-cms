"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { PersonalInfoForm } from "@/components/admin/forms/PersonalInfoForm";
import { ContactSocialForm } from "@/components/admin/forms/ContactSocialForm";
import { SkillsForm } from "@/components/admin/forms/SkillsForm";
import { ProjectsForm } from "@/components/admin/forms/ProjectsForm";
import { ExperienceForm } from "@/components/admin/forms/ExperienceForm";
import { EducationForm } from "@/components/admin/forms/EducationForm";
import { AchievementsForm } from "@/components/admin/forms/AchievementsForm";

const sectionForms = {
  profile: PersonalInfoForm,
  contact: ContactSocialForm,
  skills: SkillsForm,
  projects: ProjectsForm,
  experience: ExperienceForm,
  education: EducationForm,
  achievements: AchievementsForm
};

export function AdminDashboard({ initialContent }) {
  const [content, setContent] = useState(initialContent);
  const [activeSection, setActiveSection] = useState("profile");

  const handleSaveSection = async (sectionKey, sectionValue) => {
    const response = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: sectionKey, value: sectionValue })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to save section");
    }

    setContent(data.content);
  };

  const ActiveForm = sectionForms[activeSection];

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <AdminSidebar activeSection={activeSection} onSelectSection={setActiveSection} />
      <div className="flex-1">
        <ActiveForm value={content[activeSection]} onSave={handleSaveSection} />
      </div>
    </div>
  );
}