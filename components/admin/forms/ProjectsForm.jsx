"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { SectionCard } from "@/components/admin/SectionCard";
import { AdminTextField } from "@/components/admin/AdminTextField";
import { AdminSaveBar } from "@/components/admin/AdminSaveBar";
import { AdminRepeatableList, AdminRepeatableItem } from "@/components/admin/AdminRepeatableList";
import { generateId } from "@/lib/utils/generateId";

export function ProjectsForm({ value, onSave }) {
  const [status, setStatus] = useState("idle");

  const { register, control, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      projects: value.map((project) => ({
        ...project,
        tags: project.tags?.join(", ") ?? ""
      }))
    }
  });

  const { fields, append, remove } = useFieldArray({ control, name: "projects" });

  const onSubmit = async (values) => {
    setStatus("saving");
    try {
      const parsed = values.projects.map((project) => ({
        ...project,
        tags: project.tags
          ? project.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
          : []
      }));
      await onSave("projects", parsed);
      setStatus("saved");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <SectionCard title="Projects" description="Displayed as cards in the projects section.">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <AdminRepeatableList
          title="project"
          onAdd={() =>
            append({
              id: generateId("prj"),
              title: "",
              description: "",
              imageUrl: "",
              tags: "",
              liveUrl: "",
              githubUrl: "",
              featured: false
            })
          }
        >
          {fields.map((field, index) => (
            <AdminRepeatableItem
              key={field.id}
              title={`Project ${index + 1}`}
              onRemove={() => remove(index)}
            >
              <AdminTextField
                id={`projects.${index}.title`}
                label="Title"
                {...register(`projects.${index}.title`)}
              />
              <AdminTextField
                id={`projects.${index}.imageUrl`}
                label="Image URL"
                {...register(`projects.${index}.imageUrl`)}
              />
              <AdminTextField
                id={`projects.${index}.description`}
                label="Description"
                textarea
                className="sm:col-span-2"
                {...register(`projects.${index}.description`)}
              />
              <AdminTextField
                id={`projects.${index}.tags`}
                label="Tags (comma separated)"
                {...register(`projects.${index}.tags`)}
              />
              <AdminTextField
                id={`projects.${index}.liveUrl`}
                label="Live URL"
                {...register(`projects.${index}.liveUrl`)}
              />
              <AdminTextField
                id={`projects.${index}.githubUrl`}
                label="GitHub URL"
                {...register(`projects.${index}.githubUrl`)}
              />
            </AdminRepeatableItem>
          ))}
        </AdminRepeatableList>

        <AdminSaveBar status={status} disabled={isSubmitting} />
      </form>
    </SectionCard>
  );
}
