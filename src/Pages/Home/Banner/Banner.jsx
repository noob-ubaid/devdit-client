import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import Loader from "../../../shared/Loader";

const Banner = ({ setSearch, search }) => {
  const { data: tags = [], isPending } = useQuery({
    queryKey: ["bannerTags"],
    queryFn: async () => {
      const res = await axiosSecure("/bannerTags");
      return res.data;
    },
  });
  if (isPending) return <Loader />;
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div
      className="w-full md:h-[650px] flex items-center justify-center h-[550px] rounded-md mt-8 md:mt-10 bg-no-repeat bg-cover bg-left "
      style={{
        backgroundImage: `linear-gradient(0deg, rgb(17, 17, 17), rgba(17, 17, 17, 0) 100%), url("/banner.png")`,
      }}
    >
      <div className="space-y-4">
        <h2 className="text-2xl md:text-4xl font-semibold font-main text-white text-center">
          Discover and Share Knowledge
        </h2>
        <p className="text-center max-w-[700px] mx-auto px-4 md:px-0 font-second text-gray-400 mt-3">
          Search posts by topic or tag, explore insightful discussions, and
          connect with a community of learners and developers who share your
          interests and goals.
        </p>
        <div className="px-5 md:px-0">
          <input
            type="text"
            onChange={handleSearch}
            value={search}
            className="w-full mt-3 focus:outline-none focus:ring focus:ring-blue-500 px-4 rounded text-black font-second py-3 bg-white "
            placeholder="Search by tag"
          />
          <div className="flex items-center mt-3 justify-center">
            <p className="text-center font-main font-medium text-white">
              Popular topics :
              <span className="ml-1">
                {tags.map((tag, index) => (
                  <span
                    onClick={() => setSearch(tag.tag)}
                    key={tag._id}
                    className="cursor-pointer ml-3"
                  >
                    {tag.tag},
                  </span>
                ))}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
