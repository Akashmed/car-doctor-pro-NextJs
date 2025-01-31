
const NewService = () => {
    const handleSubmit =async e =>{
        
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="p-6 md:p-24 rounded-xl gap-5 grid grid-cols-1 md:grid-cols-2 w-full">
                <input type="text" name="name" className="rounded-lg text-black p-4 w-full" placeholder="Service Name" required />
                <input type="text" name="type" className="rounded-lg text-black p-4 w-full" placeholder="Service Type" />
                <input type="text" name="text" className="rounded-lg text-black p-4 w-full" placeholder="Text Here" required />
                <input type="text" name="price" className="rounded-lg text-black p-4 w-full" placeholder="Service Price" />
                <textarea rows={6} name="description" className="rounded-lg text-black p-4 w-full md:col-span-2" placeholder="Product Description" required></textarea>
                <button className="btn btn-primary w-full md:col-span-2">Submit</button>
            </div>
        </form>
    );
};

export default NewService;