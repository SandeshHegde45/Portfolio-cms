"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { SectionCard } from "@/components/admin/SectionCard";
import { AdminTextField } from "@/components/admin/AdminTextField";
import { AdminMediaField } from "@/components/admin/AdminMediaField";
import { AdminSaveBar } from "@/components/admin/AdminSaveBar";

export function ContactSocialForm({ value, onSave }) {
  const [status, setStatus] = useState("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues: value });

  const onSubmit = async (values) => {
    setStatus("saving");
    try {
      await onSave("contact", values);
      setStatus("saved");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <SectionCard
      title="Contact & Social"
      description="Shown in the contact section, hero, and footer of your portfolio."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <AdminTextField
            id="email"
            label="Email"
            type="email"
            error={errors.email?.message}
            {...register("email", { required: "Email is required." })}
          />
          <AdminTextField id="phone" label="Phone" {...register("phone")} />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <AdminTextField id="github" label="GitHub URL" {...register("github")} />
          <AdminTextField id="linkedin" label="LinkedIn URL" {...register("linkedin")} />
          <AdminTextField id="twitter" label="Twitter URL" {...register("twitter")} />
        </div>

        <AdminMediaField
          id="resumeUrl"
          label="Resume URL"
          accept="application/pdf,.doc,.docx"
          {...register("resumeUrl")}
        />

        <AdminSaveBar status={status} disabled={isSubmitting} />
      </form>
    </SectionCard>
  );
}
