/* eslint-disable @next/next/no-img-element */
import { styles } from "@/app/styles/styles";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import Loader from "../../Loader/Loader";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";

const EditHero = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setsubTitle] = useState("");
  const { data, refetch, isLoading: getLoading } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title);
      setsubTitle(data?.layout?.banner?.subtitle);
      setImage(data?.layout?.banner?.image?.url);
    }
    if (isSuccess) {
      refetch();
      toast.success("Hero-section updated successfully!");
    }
    if (error && "data" in error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [data, isSuccess, error, refetch]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      title,
      subtitle,
      image,
    });
  };

  return (
    <>
      {getLoading ? (
        <Loader />
      ) : (
        <div className="w-full 1000px:flex items-center min-h-screen relative overflow-hidden">
          
          {/* Background Circle */}
          <div className="absolute top-[100px] 1000px:top-1/2 1000px:-translate-y-1/2 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[500px] 1100px:w-[500px] h-[40vh] w-[40vh] hero_animation rounded-full 1000px:left-[0%] 1500px:left-[2%] z-0"></div>

          {/* Left Side: Image Content */}
          <div className="1000px:w-[45%] flex items-center justify-center z-10">
            <div className="relative flex items-center justify-center">
              <img
                src={image}
                alt="Banner"
                className="object-contain pointer-events-none w-[90%] 1100px:w-[85%] h-auto z-[10]"
              />
              <input
               title="f"
                type="file"
                id="banner"
                accept="image/*"
                onChange={handleUpdate}
                className="hidden"
              />
              <label
                htmlFor="banner"
                className="absolute bottom-[10%] right-[10%] z-20 cursor-pointer p-2 bg-black/20 rounded-full hover:bg-black/40 transition-all"
              >
                <AiOutlineCamera className="dark:text-white text-black text-[20px]" />
              </label>
            </div>
          </div>

          {/* Right Side: Text Content - Fixed Width Issues */}
          <div className="1000px:w-[55%] flex flex-col items-center 1000px:items-start text-center 1000px:text-left z-10 px-6 1000px:pr-10">
            <textarea
              className="dark:text-white resize-none text-[#000000c7] text-[35px] w-full 1000px:text-[45px] 1500px:text-[58px] font-[700] font-Josefin bg-transparent outline-none block 1000px:leading-[65px] 1500px:leading-[75px]"
              placeholder="Improve Your Online Learning Experience Better Instantly"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={4} // Rows ko badha diya taake text cut na ho
            />
            <textarea
              className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[16px] 1500px:text-[18px] w-full 1000px:w-[90%] bg-transparent outline-none resize-none mt-4"
              placeholder="Learn from the best instructors and take your skills to the next level."
              value={subtitle}
              onChange={(e) => setsubTitle(e.target.value)}
              rows={4} 
            />
          </div>

          {/* Save Button */}
          <div className="fixed bottom-10 right-10 z-[100]">
            <button
              onClick={handleEdit}
              disabled={
                data?.layout?.banner?.title === title &&
                data?.layout?.banner?.subtitle === subtitle &&
                data?.layout?.banner?.image?.url === image
              }
              className={`${
                styles.button
              } !w-[100px] !h-[40px] !min-h-[40px] !rounded
              ${
                data?.layout?.banner?.title !== title ||
                data?.layout?.banner?.subtitle !== subtitle ||
                data?.layout?.banner?.image?.url !== image
                  ? "!bg-[#42d383] cursor-pointer"
                  : "!bg-[#cccccc34] cursor-not-allowed"
              } !text-white`}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditHero;