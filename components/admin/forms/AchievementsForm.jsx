"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { SectionCard } from "@/components/admin/SectionCard";
import { AdminTextField } from "@/components/admin/AdminTextField";
import { AdminSaveBar } from "@/components/admin/AdminSaveBar";
import { AdminRepeatableList, AdminRepeatableItem } from "@/components/admin/AdminRepeatableList";
import { generateId } from "@/lib/utils/generateId";

export function AchievementsForm({ value, onSave }) {
  const [status, setStatus] = useState("idle");

  const { register, control, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: { achievements: value }
  });

  const { fields, append, remove } = useFieldArray({ control, name: "achievements" });

  const onSubmit = async (values) => {
    setStatus("saving");
    try {
      await onSave("achievements", values.achievements);
      setStatus("saved");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <SectionCard title="Achievements" description="Shown as badge cards on your portfolio.">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <AdminRepeatableList
          title="achievement"
          onAdd={() =>
            append({
              id: generateId("ach"),
              title: "",
              issuer: "",
              date: "",
              description: "",
              url: ""
            })
          }
        >
          {fields.map((field, index) => (
            <AdminRepeatableItem
              key={field.id}
              title={`Achievement ${index + 1}`}
              onRemove={() => remove(index)}
            >
              <AdminTextField
                id={`achievements.${index}.title`}
                label="Title"
                {...register(`achievements.${index}.title`)}
              />
              <AdminTextField
                id={`achievements.${index}.issuer`}
                label="Issuer"
                {...register(`achievements.${index}.issuer`)}
              />
              <AdminTextField
                id={`achievements.${index}.date`}
                label="Date (YYYY-MM)"
                {...register(`achievements.${index}.date`)}
              />
              <AdminTextField
                id={`achievements.${index}.url`}
                label="Credential URL"
                {...register(`achievements.${index}.url`)}
              />
              <AdminTextField
                id={`achievements.${index}.description`}
                label="Description"
                textarea
                className="sm:col-span-2"
                {...register(`achievements.${index}.description`)}
              />
            </AdminRepeatableItem>
          ))}
        </AdminRepeatableList>

        <AdminSaveBar status={status} disabled={isSubmitting} />
      </form>
    </SectionCard>
  );
}
