"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { SectionCard } from "@/components/admin/SectionCard";
import { AdminTextField } from "@/components/admin/AdminTextField";
import { AdminSaveBar } from "@/components/admin/AdminSaveBar";
import { AdminRepeatableList, AdminRepeatableItem } from "@/components/admin/AdminRepeatableList";
import { generateId } from "@/lib/utils/generateId";

export function ExperienceForm({ value, onSave }) {
  const [status, setStatus] = useState("idle");

  const { register, control, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: { experience: value }
  });

  const { fields, append, remove } = useFieldArray({ control, name: "experience" });

  const onSubmit = async (values) => {
    setStatus("saving");
    try {
      const parsed = values.experience.map((item) => ({
        ...item,
        current: Boolean(item.current)
      }));
      await onSave("experience", parsed);
      setStatus("saved");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <SectionCard title="Experience" description="Rendered as a chronological timeline.">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <AdminRepeatableList
          title="role"
          onAdd={() =>
            append({
              id: generateId("exp"),
              role: "",
              company: "",
              location: "",
              startDate: "",
              endDate: "",
              current: false,
              description: ""
            })
          }
        >
          {fields.map((field, index) => (
            <AdminRepeatableItem
              key={field.id}
              title={`Role ${index + 1}`}
              onRemove={() => remove(index)}
            >
              <AdminTextField
                id={`experience.${index}.role`}
                label="Role"
                {...register(`experience.${index}.role`)}
              />
              <AdminTextField
                id={`experience.${index}.company`}
                label="Company"
                {...register(`experience.${index}.company`)}
              />
              <AdminTextField
                id={`experience.${index}.location`}
                label="Location"
                {...register(`experience.${index}.location`)}
              />
              <div className="flex items-end gap-2 pb-3">
                <input
                  id={`experience.${index}.current`}
                  type="checkbox"
                  className="h-4 w-4 rounded border-ink-500 bg-ink-900 accent-signal-500"
                  {...register(`experience.${index}.current`)}
                />
                <label
                  htmlFor={`experience.${index}.current`}
                  className="font-mono text-xs uppercase tracking-wide text-ink-400"
                >
                  Current role
                </label>
              </div>
              <AdminTextField
                id={`experience.${index}.startDate`}
                label="Start (YYYY-MM)"
                {...register(`experience.${index}.startDate`)}
              />
              <AdminTextField
                id={`experience.${index}.endDate`}
                label="End (YYYY-MM)"
                {...register(`experience.${index}.endDate`)}
              />
              <AdminTextField
                id={`experience.${index}.description`}
                label="Description"
                textarea
                className="sm:col-span-2"
                {...register(`experience.${index}.description`)}
              />
            </AdminRepeatableItem>
          ))}
        </AdminRepeatableList>

        <AdminSaveBar status={status} disabled={isSubmitting} />
      </form>
    </SectionCard>
  );
}
