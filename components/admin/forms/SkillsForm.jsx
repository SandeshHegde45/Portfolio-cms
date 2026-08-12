"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { SectionCard } from "@/components/admin/SectionCard";
import { AdminTextField } from "@/components/admin/AdminTextField";
import { AdminSaveBar } from "@/components/admin/AdminSaveBar";
import { AdminRepeatableList, AdminRepeatableItem } from "@/components/admin/AdminRepeatableList";
import { generateId } from "@/lib/utils/generateId";

export function SkillsForm({ value, onSave }) {
  const [status, setStatus] = useState("idle");

  const { register, control, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: { skills: value }
  });

  const { fields, append, remove } = useFieldArray({ control, name: "skills" });

  const onSubmit = async (values) => {
    setStatus("saving");
    try {
      const parsed = values.skills.map((skill) => ({ ...skill, level: Number(skill.level) }));
      await onSave("skills", parsed);
      setStatus("saved");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <SectionCard title="Skills" description="Grouped by category and shown as proficiency meters.">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <AdminRepeatableList
          title="skill"
          onAdd={() =>
            append({ id: generateId("skl"), category: "", name: "", level: 70 })
          }
        >
          {fields.map((field, index) => (
            <AdminRepeatableItem
              key={field.id}
              title={`Skill ${index + 1}`}
              onRemove={() => remove(index)}
            >
              <AdminTextField
                id={`skills.${index}.category`}
                label="Category"
                {...register(`skills.${index}.category`)}
              />
              <AdminTextField
                id={`skills.${index}.name`}
                label="Name"
                {...register(`skills.${index}.name`)}
              />
              <AdminTextField
                id={`skills.${index}.level`}
                label="Proficiency (0-100)"
                type="number"
                min="0"
                max="100"
                {...register(`skills.${index}.level`)}
              />
            </AdminRepeatableItem>
          ))}
        </AdminRepeatableList>

        <AdminSaveBar status={status} disabled={isSubmitting} />
      </form>
    </SectionCard>
  );
}
