"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "../atoms/Button";

const IMAGE_PROFILE_1 =
  "https://lgklimjczxflxpmtjsoi.supabase.co/storage/v1/object/public/porto/Me/me7.jpeg";
const IMAGE_PROFILE_2 =
  "https://lgklimjczxflxpmtjsoi.supabase.co/storage/v1/object/public/porto/Me/me9.png";

const CV_URL =
  "https://lgklimjczxflxpmtjsoi.supabase.co/storage/v1/object/public/porto/CV/CV%20Mohamad%20Fajar%20Nur%20Khasani%20(Aug%202026).pdf";

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative w-full bg-brand-yellow text-brand-red pt-10 lg:pb-10 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="flex flex-col gap-8 relative z-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h2 className="font-gotham font-black text-4xl md:text-5xl lg:text-6xl tracking-tight">
              About Me
            </h2>

            <motion.p
              className="font-dm lg:text-xl md:text-lg text-base leading-relaxed font-medium text-justify md:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: false }}
            >
              My name is <strong>Mohamad Fajar Nur Khasani</strong>, and I am a
              passionate <strong>Full-Stack Developer</strong>. I have gained
              valuable knowledge and great experience through my academic
              studies, professional work, and community involvement in
              technology. I graduated with a{" "}
              <strong>Bachelor's Degree in Computer Science</strong> and
              previously earned a{" "}
              <strong>
                Vocational School Diploma in Computer Network Engineering
              </strong>
              . I have worked in the techology industry as a{" "}
              <strong>Software Engineer, Trainer, and Technical Support</strong>
              . My early interest in technology has grown into a strong passion
              for the field, and I am always eager to collaborate, continuously
              learn, and create impactful digital solutions.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: false }}
            >
              <Button href="#work" text="Read More" />
              <Button
                href={CV_URL}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </Button>
            </motion.div>
          </motion.div>

          <div className="relative h-[500px] lg:h-[600px] w-full flex flex-col justify-start md:gap-0 lg:block">
            <motion.div
              className="absolute top-1/2 md:top-1/8 left-1/10 md:-left-1/10 select-none z-20"
              initial={{ scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
              viewport={{ once: false }}
            >
              <div className="transition-transform hover:rotate-45 duration-500">
                <Image
                  src="/sun-red.svg"
                  alt="Decorative Sun"
                  width={100}
                  height={100}
                  className="animate-[spin_20s_linear_infinite] lg:animate-spin-slow object-contain w-20 h-20 md:w-24 md:h-24 lg:w-30 lg:h-30"
                />
              </div>
            </motion.div>

            <motion.div
              className="relative w-[80%] md:w-[60%] h-60 md:h-[270px] lg:h-[300px] lg:absolute lg:top-0 lg:right-0 overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <Image
                src={IMAGE_PROFILE_1}
                alt="Profile Back"
                fill
                className="object-cover grayscale contrast-125 hover:grayscale-0 hover:scale-105 transition-all duration-500"
              />
            </motion.div>

            <motion.div
              className="relative -top-10 md:-top-16 self-end w-[80%] md:w-[70%] h-60 md:h-[300px] lg:h-[350px] lg:mt-0 lg:absolute lg:bottom-0 lg:left-10 overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: -50, y: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <Image
                src={IMAGE_PROFILE_2}
                alt="Profile Front"
                fill
                className="object-cover grayscale contrast-125 hover:grayscale-0 hover:scale-105 transition-all duration-500"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
