import AppAds from "../../src/Components/Home/AppAds/AppAds";
import useMainDomain from "../../src/hooks/useMainDomain";

const Privacy = () => {
  const mainDomain = useMainDomain();
console.log(mainDomain)
  return (
    <>
      <div className="relative terms-img z-10">
        <h1 className="term-text sm:text-2xl text-xl  sm:w-64 w-[210px]">
          Privacy Policy
        </h1>
      </div>

      <div className="mid-container text-justify">
        <h1 className="font-semibold sm:text-2xl text-xl mt-10 mb-3">
          Last updated: February 15, 2022
        </h1>
        <p className="text-sm">
          This privacy policy sets out how {mainDomain} uses and protects any
          information that you give here when you use this website. We view
          protection of your privacy as a very important principle. — Your
          information will only be used in accordance with this privacy
          statement whenever we ask you to provide any information by which you
          can be identiﬁed while using this website. You will be required to
          enter a valid phone number while signing up and placing an order on {mainDomain}. By registering your phone number with us. you consent to
          be contacted by us via phone calls and/or SMS, in case of any order or
          delivery related updates.
        </p>

        <p className="mt-4 text-sm">
          We store and process your information in computers that are protected
          by physical as well as reasonable technological security measures.
          {mainDomain} may change this privacy policy from time to time if
          needed by updating this page. Please check this page periodically to
          ensure that you are happy with our privacy policy
        </p>

        <h1 className="font-semibold sm:text-2xl text-xl mt-10 mb-3">
          Consent
        </h1>
        <p className="text-sm">
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
        </p>

        <h1 className="font-semibold sm:text-2xl text-xl mt-10 mb-3">
          Information we collect
        </h1>
        <p className="text-sm">
          The personal information that you are asked to provide, and the
          reasons why you are asked to provide it, will be made clear to you at
          the point we ask you to provide your personal information. If you
          contact us directly, we may receive additional information about you
          such may choose to provide. When you register for an Account, we may
          ask for your contact information, including items such as name,
          company name, address, email address, and telephone number.
        </p>

        <h1 className="font-semibold  mt-10 mb-2">
          How we use your information
        </h1>
        <ul className="grid gap-2">
          <li className="text-sm">
            1. Provide, operate, and maintain our website, to provide you with
            updates and other information.
          </li>
          <li className="text-sm">
            2. Improve, personalize, and expand our website,and other
            information relating to the website.
          </li>
          <li className="text-sm">
            3. Understand and analyze how you use our website, to provide you
            with updates and other information relating to the website.
          </li>
          <li className="text-sm">
            4. Develop new products, services, features, and functionality,and
            other information relating to the website.
          </li>
          <li className="text-sm">
            5. Communicate with you, either directly or through one of our
            partners, including for customer service, to provide you with
            updates.
          </li>
          <li className="text-sm">
            6. Send you emails. To provide you with updates and other
            information relating to the website, and for marketing and
            promotional purposes.
          </li>
          <li className="text-sm">
            7. Find and prevent fraud. To provide you with updates and other
            information relating to the website, and for marketing and
            promotional purposes
          </li>
        </ul>

        <h1 className="font-semibold sm:text-2xl text-xl mt-10 mb-3">
          Childrens Information
        </h1>
        <p className="text-sm">
          Another part of our priority is adding protection for children while
          using the internet. We encourage parents and guardians to observe,
          participate in, and/or monitor and guide their online activity.Request
          that a business delete any personal data about the consumer that a
          business has collected. If you make a request, we have one month to
          respond to you. If you would like to exercise any of these rights,
          please contact us.
        </p>

        <p className="text-sm mt-3 md:mb-10 mb-5">
          {mainDomain} does not knowingly collect any Personal Identifiable
          Information from children under the age of 13. If you think that your
          child provided this kind of information on our website, we strongly
          encourage you to contact us immediately and we will do our best
          efforts to promptly remove such information from our records.
        </p>
      </div>
      {/* <NewsLetter/> */}
      <AppAds />
    </>
  );
};

export default Privacy;
