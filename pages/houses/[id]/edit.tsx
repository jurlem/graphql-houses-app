import { GetServerSideProps, NextApiRequest } from "next";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { loadIdToken } from "src/auth/firebaseAdmin";
import Layout from "src/components/layout";
import HouseForm from "src/components/houseForm";
import { useAuth } from "src/auth/useAuth";
import {
  EditHouseQuery,
  EditHouseQueryVariables,
} from "src/generated/EditHouseQuery";

const EDIT_HOUSE_QUERY = gql`
query EditHouseQuery($id: String!){
  house(id: $id){
id
userId
address
image
publicId
bedrooms
latitude
longitude
  }
}
`


export default function EditHouse() {

  const { query: { id } } = useRouter()
  if (!id) return null



  return <HouseData id={id as string} />
}

function HouseData({ id }: { id: string }) {
  const { user } = useAuth()

  const { data, loading } = useQuery<EditHouseQuery, EditHouseQueryVariables>
    (EDIT_HOUSE_QUERY, {
      variables: { id }
    })

  if (!user) return <Layout main={<div>Please log in</div>} />
  if (loading) return <Layout main={<div>loading...</div>} />
  if (data && !data.house) return <Layout main={<div>Unable to load the house</div>} />
  if (user.uid !== data?.house?.userId) return <Layout main={<div>You dont have permission</div>} />

  return <Layout main={<HouseForm house={data.house} />} />
}

//serverside check that user is auth (so the above should actually vener happen):
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest)

  if (!uid) {
    res.setHeader("location", "/auth")
    res.statusCode = 302;
    res.end()
  }
  return { props: {} }

}
