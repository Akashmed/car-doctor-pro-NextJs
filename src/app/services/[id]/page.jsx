// app/service/[id]/page.js (Server Component)

import ServiceDetails from "./serviceDetails";

const Page = ({ params }) => {
    return <ServiceDetails serviceId={params.id} />;
};

export default Page;
