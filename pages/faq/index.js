
import AppAds from "../../src/Components/Home/AppAds/AppAds";
import faq from "../../public/assets/faq.svg";
import Contact from "../../src/Components/Contact/Contact";
import SecondaryImageCover from "../../src/Shared/SecondaryImageCover";
import Image from "next/image";

const FAQ = () => {
  return (
    <>
      <SecondaryImageCover title={"FAQ"} />

      <div className="lg:py-16 md:py-10 py-5">
        <div className="mid-container md:flex gap-5 justify-center items-center">
          <div className="md:w-[50%] md:mb-0 mb-7">
            <Image
              src={faq}
              alt="faq"
              width={600}
              height={100}
              className="rounded-t-md object-cover w-full h-full"
            />
          </div>
          <div className="md:w-[50%] grid gap-3 text-[#747680]">
            <div
              tabIndex={0}
              className="collapse collapse-arrow bg-accent rounded "
            >
              <div className="collapse-title font-semibold">
                How does the E-POCKET work?
              </div>
              <div className="collapse-content ">
                <p className="text-sm">
                  {" "}
                  Yes. You can cancel your subscription anytime. Your
                  subscription will continue to be active until the end of your
                  current term (month or year) but it will not auto-renew.
                  Unless you delete your account manually, your account and all
                  data will be deleted 60 days from the day your subscription
                  becomes inactive.
                </p>
              </div>
            </div>
            <div
              tabIndex={0}
              className="collapse collapse-arrow bg-accent rounded "
            >
              <div className="collapse-title font-semibold">
                Can I cancel my subscription anytime?
              </div>
              <div className="collapse-content">
                <p className="text-sm">
                  {" "}
                  Distinctively initiate error-free channels with highly
                  efficient ROI. Intrinsicly envisioneer world-class data via
                  best-of-breed best practices. Efficiently enable empowered
                  e-tailers after cross-unit services. Uniquely expedite
                  seamless e-tailers via cooperative interfaces. Monotonectally
                  myocardinate customer directed meta-services whereas
                  error-free scenarios.
                </p>
              </div>
            </div>
            <div
              tabIndex={0}
              className="collapse collapse-arrow bg-accent rounded "
            >
              <div className="collapse-title font-semibold">
                Which payment method you should accept?
              </div>
              <div className="collapse-content">
                <p className="text-sm">
                  {" "}
                  Holisticly engage sticky niche markets before collaborative
                  collaboration and idea-sharing. Phosfluorescently facilitate
                  parallel applications with unique imperatives. Proactively
                  plagiarize functionalized deliverables via inexpensive
                  solutions. Collaboratively embrace web-enabled infomediaries
                  rather than diverse testing procedures.
                </p>
              </div>
            </div>

            <div
              tabIndex={0}
              className="collapse collapse-arrow bg-accent rounded "
            >
              <div className="collapse-title font-semibold">
                What are the benefits of using E-POCKET?
              </div>
              <div className="collapse-content">
                <p className="text-sm">
                  {" "}
                  Continually impact seamless imperatives for best-of-breed best
                  practices. Phosfluorescently facilitate parallel applications
                  with unique imperatives. Proactively plagiarize functionalized
                  deliverables via inexpensive solutions. Collaboratively
                  embrace web-enabled infomediaries rather than diverse testing
                  procedures.
                </p>
              </div>
            </div>

            <div
              tabIndex={0}
              className="collapse collapse-arrow bg-accent rounded "
            >
              <div className="collapse-title font-semibold">
                What is a affiliates product configuration?
              </div>
              <div className="collapse-content">
                <p className="text-sm">
                  {" "}
                  Distinctively initiate error-free channels with highly
                  efficient ROI. Intrinsicly envisioneer world-class data via
                  best-of-breed best practices. Efficiently enable empowered
                  e-tailers after cross-unit services. Uniquely expedite
                  seamless e-tailers via cooperative interfaces. Monotonectally
                  myocardinate customer directed meta-services whereas
                  error-free scenarios.
                </p>
              </div>
            </div>

            <div
              tabIndex={0}
              className="collapse collapse-arrow bg-accent rounded "
            >
              <div className="collapse-title font-semibold">
                What is E-POCKET EC2 auto scaling?
              </div>
              <div className="collapse-content">
                <p className="text-sm">
                  {" "}
                  Continually impact seamless imperatives for best-of-breed best
                  practices. Phosfluorescently facilitate parallel applications
                  with unique imperatives. Proactively plagiarize functionalized
                  deliverables via inexpensive solutions. Collaboratively
                  embrace web-enabled infomediaries rather than diverse testing
                  procedures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mid-container">
        <div className=" py-8 flex flex-col md:ml-auto w-full md:py-8  md:mt-0 ">
          <h1 className=" text-2xl mb-1 font-semibold title-font">
            For any support just send your Query
          </h1>
          <p className="leading-relaxed mb-5 text-sm text-gray-500">
            Collaboratively promote client-focused convergence vis-a-vis
            customer directed alignments via plagiarize strategic users and
            standardized infrastructures.
          </p>
          <form>
            <div className="grid grid-cols-2 gap-5">
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
            </div>
            <div className=" p mb-4">
              <label htmlFor="name" className="leading-7 text-sm ">
                Subject
              </label>
              <input
                type="text"
                id="name"
                name="user_name"
                className="w-full rounded input input-bordered focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 duration-500 ease-in-out focus:outline-none"
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

      {/* <NewsLetter/> */}
      <AppAds />
    </>
  );
};

export default FAQ;
