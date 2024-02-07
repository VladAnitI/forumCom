import cn from "classnames";
import Heading from "../../components/Heading/Heading";
import styles from "./Categories.module.css";
import Search from "../../components/Search/Search";
import { LuSearch } from "react-icons/lu";
import { useState, ChangeEvent } from "react";
import { FaArrowDownShortWide, FaArrowUpWideShort } from "react-icons/fa6";
import ApiService from '../../../service/ApiService'; 
import { Loading } from "../Loading/Loading";
export function Categories() {
  interface ICategory {
    name: string;
    image: string;
    dateAndTime: string;
    category: string;
  }

  interface CategoryProps {
    category: ICategory;
  }

  const Category: React.FC<CategoryProps> = ({ category }) => {
    return (
      <div className={cn(styles["category"])}>
        <div className={cn(styles["group1"])}>
          <img
            src={category.image}
            alt={category.name}
            className={cn(styles["category-image"])}
          />
          <span className={cn(styles["category-name"])}>{category.name}</span>
        </div>
        <div className={cn(styles["group2"])}>
          <span className={cn(styles["category-time"])}>
            Created at: {category.dateAndTime}
          </span>
          <span className={cn(styles["category-category"])}>
            Category: {category.category}
          </span>
        </div>
      </div>
    );
  };

  const arr: ICategory[] = [
    {
      name: "category1",
      image:
        "https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg",
      dateAndTime: "15.00 01.02.24",
      category: "book",
    },
    {
      name: "category2",
      image:
        "https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg",
      dateAndTime: "15.00 01.02.24",
      category: "fun",
    },
    {
      name: "category3",
      image:
        "https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg",
      dateAndTime: "15.00 01.02.24",
      category: "computer",
    },
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ICategory[]>(arr);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
    const filteredResults = arr.filter((category) =>
      category.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const controlByEmogie = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
	if(event.target.value === ""){setSearchResults(arr)}
	else{setSearchResults(arr.filter((category) => category.category === event.target.value));}
  };

  const [dateSortMethod, setDateSortMethod] = useState<string>("down");

  const funcSetDateSortMethod = ():void => {
    if (dateSortMethod === "down") {
      setDateSortMethod("up");
    } else {
      setDateSortMethod("down");
    }
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

    const fetchCategories = async () => {
    try {
      const response = await ApiService.getCategories();
      if (response.ok) {
        setCategories(response.categories);
      } else {
        console.error(response.message);
        // Обработка ошибки, если response.ok === false
      }
    } catch (error) {
      console.error('Error fetching categories', error);
      // Обработка ошибки запроса
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={cn(styles["header"])}>
        <Heading>Categories</Heading>
        <select value={searchTerm} onChange={controlByEmogie} className={cn(styles["select"])}>
          <option value="">Select Category</option>
          <option value="book">Book</option>
          <option value="computer">Computer</option>
          <option value="fun">Fun</option>
          <option value="food">Food</option>
          <option value="chatting">Chatting</option>
        </select>
        <div className={cn(styles['dateSort'])} onClick={()=>{funcSetDateSortMethod()}}>
          <span>Date</span>
          {dateSortMethod=="down"? <FaArrowDownShortWide /> : <FaArrowUpWideShort />}
        </div>
        <div className={cn(styles["search"])}>
          <div className={cn(styles["search-container"])}>
            <LuSearch className={cn(styles["search-icon"])} />
            <Search placeholder="type to search category" onChange={handleSearch} />
          </div>
        </div>
      </div>

      {loading ? (
        <div className={cn(styles.container)}>
          <Loading />
        </div>
      ) : (
        <div>
          {categories.map((category, index) => (
            <Category key={index} category={category} />
          ))}
        </div>
      )}
    </>
  );
}
