
import AppAds from "../../src/Components/Home/AppAds/AppAds";
import NewsLetter from "../../src/Components/Home/NewsLetter/NewsLetter";
import { useMyShopData } from "../../src/hooks/useMyShopData";
import useMainDomain from "../../src/hooks/useMainDomain";

const Terms = () => {
  const { data } = useMyShopData();
  const mainDomain = useMainDomain();
  return (
    <>
      <div className="relative terms-img z-10">
        <h1 className="term-text sm:text-2xl text-xl  sm:w-64 w-[210px]">
          Terms & Conditions
        </h1>
      </div>

      <div className="mid-container text-justify">
        <h1 className="font-semibold sm:text-2xl text-xl mt-10 mb-3">
          Welcome to E-POCKET !
        </h1>

        <p className="my-2 ">
          The Domain name {mainDomain} is owned by {mainDomain}. whose
          registered ofﬁce is at {data?.data?.address}. Your use of this
          ecommerce portal and services and tools are governed by the following
          Terms and Conditions as applicable to the website. When you visit the
          website, you are subject to the policies that are applicable here.
        </p>
        <p className="my-2 ">
          For the purpose of these Terms of Use. wherever the context so
          requires 'You' or 'User' or 'Visitor' will mean any natural or legal
          person who has agreed to become a member of the site by signing up.
          {mainDomain} allows user to surf the website or making purchases
          without registering on the website. The term "we", "us". "our" will
          mean {mainDomain}.
        </p>
        <p className="my-2 ">
          When you use {mainDomain}. we collect and store your personal
          information which is provided by you from time to time. Our primary
          goal in doing so is to provide you a safe, efﬁcient, and customized
          experience. This allows us to provide services and features that most
          likely meet your needs. If you choose to buy on the website, we
          collect information about your buying behavior.
        </p>
        <p className="my-2 ">
          If you choose to mail us or leave feedback, we will collect that
          information you provide to us. We retain this information as necessary
          to resolve disputes, provide customer support and troubleshoot
          problems as permitted by law. In our efforts to continually improve
          our product and service offerings, we collect and analyze demographic
          and proﬁle data about our users' activity on our website. Our website
          may link to other websites too. These links are provided for your
          convenience to provide further information. {mainDomain} is not
          responsible for the practices, term of use or the content of those
          linked websites.
        </p>
        <p className="my-2 ">
          This website contains materials which are owned by us. These materials
          include. but are not limited to, the design, look, appearance, data,
          and graphics. Reproduction is prohibited other than in accordance with
          the copyright law. Unauthorized use of this site may give rise to a
          claim for damages. Products at this ecommerce Portal are sold by
          respective sellers. All materials on this site are protected by
          copyrights. trademarks. and other intellectual property rights.
          Material on website is solely for personal and noncommercial use of
          users. Without the prior written consent of the owner, modiﬁcation or
          use of the materials on any other website is violation of the law. and
          is prohibited.
        </p>
        <p className="my-2 ">
          We reserve the right to change, modify. add or remove portions of
          these Terms of Use at any time without any prior written notice. If we
          decide to change the terms of use. we will post those changes on this
          page so that you are always aware of what information we collect and
          how we use it.
        </p>
      </div>
      {/* <NewsLetter/> */}
      <AppAds />
    </>
  );
};

export default Terms;
