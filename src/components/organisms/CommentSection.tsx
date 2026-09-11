"use client";

import { useActionState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { createComment } from "@/lib/comment-actions";
import { Button } from "@/components/atoms/Button";
import type { Comment, CommentTarget } from "@/lib/supabase";
import type { CommentFormState } from "@/lib/validations/comment";

interface CommentSectionProps {
  targetType: CommentTarget;
  targetSlug: string;
  comments: Comment[];
}

const initialState: CommentFormState = { success: false, message: "" };

const inputClass =
  "w-full border border-brand-red/50 bg-brand-black px-4 py-2.5 font-dm text-sm text-brand-red/80 placeholder:text-brand-red/60 outline-none transition-colors focus:border-brand-red/80";

export const CommentSection = ({
  targetType,
  targetSlug,
  comments,
}: CommentSectionProps) => {
  const boundAction = createComment.bind(null, targetType, targetSlug);
  const [state, formAction, isPending] = useActionState(
    boundAction,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state]);

  return (
    <section className="w-full bg-brand-black px-6 md:px-12 py-16">
      <div className="mx-auto w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="font-gotham font-black text-brand-red text-3xl md:text-4xl tracking-tight">
            Comments{" "}
            <span className="text-brand-red/60 text-xl md:text-2xl">
              ({comments.length})
            </span>
          </h2>
          <p className="font-dm text-sm md:text-base text-brand-red/80">
            Share your thoughts. Comments appear after moderation.
          </p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="lg:sticky lg:top-24 h-fit">
            <form
              ref={formRef}
              action={formAction}
              className="border border-brand-red/50 bg-brand-black p-4 md:p-6"
            >
              <h3 className="font-gotham font-bold text-brand-red text-lg md:text-xl">
                Leave a comment
              </h3>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor={`comment-name-${targetType}-${targetSlug}`}
                    className="block font-dm font-bold text-sm text-brand-red/80"
                  >
                    Name
                  </label>
                  <input
                    id={`comment-name-${targetType}-${targetSlug}`}
                    name="name"
                    type="text"
                    maxLength={50}
                    placeholder="Your name"
                    autoComplete="name"
                    className={inputClass}
                  />
                  {state.errors?.name && (
                    <p className="text-xs text-brand-red/60">
                      {state.errors.name[0]}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor={`comment-message-${targetType}-${targetSlug}`}
                    className="block font-dm font-bold text-sm text-brand-red/80"
                  >
                    Comment
                  </label>
                  <textarea
                    id={`comment-message-${targetType}-${targetSlug}`}
                    name="message"
                    rows={4}
                    maxLength={1000}
                    placeholder="What do you think?"
                    className={`${inputClass} resize-y`}
                  />
                  {state.errors?.message && (
                    <p className="text-xs text-brand-red/60">
                      {state.errors.message[0]}
                    </p>
                  )}
                </div>

                {/* Honeypot field for bots */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                {state.message && (
                  <p
                    className={`font-dm text-sm ${
                      state.success ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {state.message}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isPending}
                  text={isPending ? "Sending..." : "Post comment"}
                  size="sm"
                />
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-5">
            {comments.length === 0 ? (
              <p className="font-dm text-brand-red/80">
                No comments yet. Be the first to share your thoughts.
              </p>
            ) : (
              comments.map((comment) => (
                <article
                  key={comment.id}
                  className="border border-brand-red/50 bg-brand-black p-4"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-gotham font-bold text-brand-red text-base md:text-lg">
                      {comment.name}
                    </span>
                    <time className="font-dm text-xs text-brand-red/60">
                      {new Date(comment.created_at).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </time>
                  </div>
                  <p className="mt-2 font-dm text-sm md:text-base leading-relaxed text-brand-red/80 whitespace-pre-line">
                    {comment.message}
                  </p>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
