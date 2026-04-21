import Image from "next/image";
import React from "react";

function Register() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-215 flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="carepulse"
            className="mb-12 h-10 w-fit"
          />
        </div>
      </section>
    </div>
  );
}

export default Register;
