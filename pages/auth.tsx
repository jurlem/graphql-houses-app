import Layout from "src/components/layout";
import FirebaseAuth from "src/components/firebaseAuth";
import { GetServerSideProps, NextApiRequest } from "next";
import { loadIdToken } from "src/auth/firebaseAdmin";

export default function Auth() {
  return <Layout main={<div><FirebaseAuth /></div>} />
}

// we use this to determine server side, before browser, if user is logged in. if so, then dont show the login field
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest)
  console.log({ uid })

  if (uid) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end()
  }

  return { props: {} }
}