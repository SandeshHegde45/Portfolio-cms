"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { SectionCard } from "@/components/admin/SectionCard";
import { AdminTextField } from "@/components/admin/AdminTextField";
import { AdminSaveBar } from "@/components/admin/AdminSaveBar";
import { AdminRepeatableList, AdminRepeatableItem } from "@/components/admin/AdminRepeatableList";
import { generateId } from "@/lib/utils/generateId";

export function EducationForm({ value, onSave }) {
  const [status, setStatus] = useState("idle");

  const { register, control, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: { education: value }
  });

  const { fields, append, remove } = useFieldArray({ control, name: "education" });

  const onSubmit = async (values) => {
    setStatus("saving");
    try {
      await onSave("education", values.education);
      setStatus("saved");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <SectionCard title="Education" description="Rendered as a chronological timeline.">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <AdminRepeatableList
          title="entry"
          onAdd={() =>
            append({
              id: generateId("edu"),
              institution: "",
              degree: "",
              startDate: "",
              endDate: "",
              description: ""
            })
          }
        >
          {fields.map((field, index) => (
            <AdminRepeatableItem
              key={field.id}
              title={`Entry ${index + 1}`}
              onRemove={() => remove(index)}
            >
              <AdminTextField
                id={`education.${index}.institution`}
                label="Institution"
                {...register(`education.${index}.institution`)}
              />
              <AdminTextField
                id={`education.${index}.degree`}
                label="Degree"
                {...register(`education.${index}.degree`)}
              />
              <AdminTextField
                id={`education.${index}.startDate`}
                label="Start (YYYY-MM)"
                {...register(`education.${index}.startDate`)}
              />
              <AdminTextField
                id={`education.${index}.endDate`}
                label="End (YYYY-MM)"
                {...register(`education.${index}.endDate`)}
              />
              <AdminTextField
                id={`education.${index}.description`}
                label="Description"
                textarea
                className="sm:col-span-2"
                {...register(`education.${index}.description`)}
              />
            </AdminRepeatableItem>
          ))}
        </AdminRepeatableList>

        <AdminSaveBar status={status} disabled={isSubmitting} />
      </form>
    </SectionCard>
  );
}
