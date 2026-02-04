import React, { FC, useEffect, useState } from "react";
import { styles } from "../../../styles/styles";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
type Props = {
  active: number;
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  active,
  courseInfo,
  setCourseInfo,
  setActive,
}) => {
  const {data}=useGetHeroDataQuery("Categories",{});
  const [dragging, setDragging] = useState(false);
  const [categories,setCategories]=useState([]);

  useEffect(() => {
   if(data){
    setCategories(data?.layout?.categories)
   }
  }, [data])
  

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };
   const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: e.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  // Triggered when file is dragged over drop area
  const handleDrageOver=(e:any)=>{
    e.preventDefault();
    setDragging(true);
  }
   
       // Triggered when drag leaves the drop area

   const handleDrageLeave=(e:any)=>{
    e.preventDefault();
    setDragging(false);
  }
  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (e: any) => {
        setCourseInfo({ ...courseInfo, thumbnail: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24">
  <form onSubmit={handleSubmit}>
    {/* Course Name */}
    <div>
      <label className={`${styles.label}`}>Course Name</label>
      <input
        type="text"
        required
        value={courseInfo.name}
        onChange={(e: any) => setCourseInfo({ ...courseInfo, name: e.target.value })}
        placeholder="MERN stack LMS platform with next 13"
        className={`${styles.input}`}
      />
    </div>
    <br />

    {/* Course Description */}
    <div className="mb-5">
      <label className={`${styles.label}`}>Course Description</label>
      <textarea
        cols={30}
        rows={8}
        placeholder="Write something amazing..."
        className={`${styles.input} !h-min !py-2`}
        value={courseInfo.description}
        onChange={(e: any) => setCourseInfo({ ...courseInfo, description: e.target.value })}
      ></textarea>
    </div>
    <br />

    {/* Price Row */}
    <div className="w-full flex justify-between gap-x-5">
      <div className="w-[45%]">
        <label className={`${styles.label}`}>Course Price</label>
        <input
          type="number"
          required
          value={courseInfo.price}
          onChange={(e: any) => setCourseInfo({ ...courseInfo, price: e.target.value })}
          placeholder="29"
          className={`${styles.input}`}
        />
      </div>
      <div className="w-[50%]">
        <label className={`${styles.label}`}>Estimated Price</label>
        <input
          type="number"
          required
          value={courseInfo.estimatedPrice}
          onChange={(e: any) => setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })}
          placeholder="79"
          className={`${styles.input}`}
        />
      </div>
    </div>
    <br />

     {/* Tags input  && Course-Categories */}
        <div className="flex justify-between w-full">
          <div className="w-[46%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course Tags
            </label>
            <input
              type="name"
              name=""
              required
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id="name"
              placeholder="MERN,Next 13,Socket io,tailwind css,LMS"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[46%]">
            <label htmlFor="categories" className={styles.label}>
              Course Category
            </label>
            <select
              id="categories"
              className={`${styles.input} dark:bg-slate-900 dark:text-white`}
              value={courseInfo.categories}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
            >
              {categories.map((category: any) => (
                <option key={category._id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>
    <br />

    {/* Level and Demo URL Row */}
    <div className="w-full flex justify-between gap-x-5">
      <div className="w-[45%]">
        <label className={`${styles.label}`}>Course Level</label>
        <input
          type="text"
          required
          value={courseInfo.level}
          onChange={(e: any) => setCourseInfo({ ...courseInfo, level: e.target.value })}
          placeholder="Beginner/Intermediate/Expert"
          className={`${styles.input}`}
        />
      </div>
      <div className="w-[50%]">
        <label className={`${styles.label}`}>Demo Url</label>
        <input
          type="text"
          required
          value={courseInfo.demoUrl}
          onChange={(e: any) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })}
          placeholder="eer74fd"
          className={`${styles.input}`}
        />
      </div>
    </div>
    <br />

    {/* Thumbnail Drag & Drop Styling */}
    <div className="w-full">
      <input
        type="file"
        accept="image/*"
        id="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor="file"
        className={`w-full min-h-[15vh] dark:border-white border-[#00000026] p-3 border-2 border-dashed flex items-center justify-center cursor-pointer transition-all ${
          dragging ? "bg-blue-500/20 border-blue-500" : "bg-transparent"
        }`}
        onDragOver={handleDrageOver}
        onDrop={handleDrop}
        onDragLeave={handleDrageLeave}
      >
        {courseInfo.thumbnail ? (
          <img
            src={courseInfo.thumbnail}
            alt="Thumbnail"
            className="max-h-[200px] object-cover w-full rounded"
          />
        ) : (
          <span className="text-gray-400 text-sm">
            Drag and Drop Your Thumbnail here or click to Browse
          </span>
        )}
      </label>
    </div>
    <br />

    <div className="w-full flex items-center justify-end">
      <input
        type="submit"
        value="Next"
        className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer hover:bg-[#2d8a82] transition"
      />
    </div>
  </form>
</div>
  );
};

export default CourseInformation;
