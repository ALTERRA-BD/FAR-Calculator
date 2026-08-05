"use client";

import { FieldGroup, FieldSeparator } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import useRHF from "@/hooks/useRHF";
import {
  DEFAULT_NULL_VALUES,
  FORM_SCHEMA,
  type IFormSchema,
} from "@/lib/schema";
import { useState } from "react";
import { SendIcon } from "lucide-react";
import FormInput from "@/components/form/form-input";
import FormTextarea from "@/components/form/form-textarea";
import FormSelect from "@/components/form/form-select";
import FormSwitch from "@/components/form/form-switch";
import FormRadioGroup from "@/components/form/form-radio-group";
import FormCheckbox from "@/components/form/form-checkbox";
import FormDatePicker from "@/components/form/form-date-picker";
import FormOTP from "@/components/form/form-otp";
import FormSlider from "@/components/form/form-slider";
import FormRange from "@/components/form/form-range";
import FormToggle from "@/components/form/form-toggle";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  const form = useRHF({
    formSchema: FORM_SCHEMA,
    defaultValues: DEFAULT_NULL_VALUES,
  });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(data: IFormSchema) {
    setSubmitting(true);
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubmitting(false);
  }

  return (
    <Card className="mx-auto max-w-xl py-0">
      <CardHeader className="space-y-1 border-b bg-muted/40 pt-4">
        <CardTitle>Testing Form Components</CardTitle>
        <CardDescription>
          This is a simple form to test various form components.
        </CardDescription>
        <CardAction>
          <Button type="button">Test</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="bug-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* FormInput */}
            <FormInput
              name="title"
              control={form.control}
              label="Bug Title"
              inputProps={{
                placeholder: "Login button not working on mobile",
                autoComplete: "off",
              }}
            />

            {/* FormTextarea */}
            <FormTextarea
              name="bio"
              control={form.control}
              label="Bio"
              description="Tell us a little about yourself."
              maxLength={200}
              textareaProps={{
                placeholder: "I'm a software engineer...",
                rows: 4,
              }}
            />

            <FieldSeparator />

            {/* FormSelect */}
            <FormSelect
              name="category"
              control={form.control}
              label="Category"
              placeholder="Select a category"
              options={[
                { value: "bug", label: "Bug" },
                { value: "feature", label: "Feature Request" },
                { value: "question", label: "Question" },
                { value: "other", label: "Other" },
              ]}
              searchable
            />

            {/* FormRadioGroup (choice card) */}
            <FormRadioGroup
              name="priority"
              control={form.control}
              label="Priority"
              options={[
                { value: "low", label: "Low", description: "No rush." },
                {
                  value: "medium",
                  label: "Medium",
                  description: "Should be looked at soon.",
                },
                {
                  value: "high",
                  label: "High",
                  description: "Blocking, needs attention now.",
                },
              ]}
            />

            {/* FormSwitch (choice card) */}
            <FormSwitch
              name="notifyByEmail"
              control={form.control}
              label="Email notifications"
              description="Get notified by email when this bug is updated."
            />

            {/* FormCheckbox */}
            <FormCheckbox
              name="agreeToTerms"
              control={form.control}
              label="I agree to the terms and conditions"
            />

            {/* FormDatePicker */}
            <FormDatePicker
              name="dueDate"
              control={form.control}
              label="Due Date"
              description="When should this be resolved by?"
            />

            {/* FormOTP */}
            <FormOTP
              name="verificationCode"
              control={form.control}
              label="Verification Code"
              description="Enter the 6-digit code we sent you."
            />

            {/* FormSlider */}
            <FormSlider
              name="severity"
              control={form.control}
              label="Severity"
              min={0}
              max={10}
            />

            {/* FormRange */}
            <FormRange
              name="budgetRange"
              control={form.control}
              label="Budget Range ($)"
              min={0}
              max={200}
              step={10}
            />

            {/* FormToggle */}
            <FormToggle name="isBold" control={form.control} label="Text style">
              Bold
            </FormToggle>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="justify-end gap-2 border-t bg-muted/40 pb-(--card-spacing)">
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
          className="shadow"
        >
          Reset
        </Button>
        <Button
          form="bug-form"
          type="submit"
          loading={submitting}
          icon={<SendIcon />}
          className="shadow"
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
