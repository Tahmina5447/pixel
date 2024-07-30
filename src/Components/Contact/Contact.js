import Image from "next/image";


const Contact = () => {
  return (
    <div className="md:mb-10">
      <div className="mid-container grid md:grid-cols-2 gap-10">
        <div className="flex justify-center items-center">
          <Image
            src={"/assets/contact-us.webp"}
            alt="Contact Us"
            width={300}
            height={500}
            className="md:w-full "
          />
        </div>

        <div className=" py-10 flex flex-col md:ml-auto w-full md:py-8  md:mt-0 ">
          <h1 className=" text-2xl mb-1 font-semibold title-font">
            For any support just send your Query
          </h1>
          <p className="leading-relaxed mb-5 text-sm text-gray-500">
            Collaboratively promote client-focused convergence vis-a-vis
            customer directed alignments via plagiarize strategic users and
            standardized infrastructures.
          </p>
          <form>
            <div className=" p mb-4">
              <label htmlFor="name" className="leading-7 text-sm ">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="user_name"
                className="w-full rounded input input-bordered focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 duration-500 ease-in-out focus:outline-none"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="user_email"
                className="w-full rounded input input-bordered focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 duration-500 focus:outline-none"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="message" className="leading-7 text-sm">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full rounded input input-bordered focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out focus:outline-none"
                defaultValue={""}
              />
            </div>

            <input
              className="text-white btn btn-primary border-0 py-2 px-6 focus:outline-none w-full rounded"
              type="submit"
              value="Send Message"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
