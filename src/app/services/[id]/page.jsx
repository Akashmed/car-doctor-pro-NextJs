// app/service/[id]/page.js (Server Component)

import ServiceDetails from "./serviceDetails";

const Page = async ({ params }) => {
    const { id } = await params;
    return <ServiceDetails serviceId={id} />;
};

export default Page;
