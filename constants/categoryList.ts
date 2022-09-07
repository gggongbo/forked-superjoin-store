import { Category } from '~/types/category';
import * as CategoryList from './category';

const categoryList: Category[] = [];
categoryList.push(CategoryList.TALK);
categoryList.push(CategoryList.LIFE);
categoryList.push(CategoryList.TRAVEL);
categoryList.push(CategoryList.SPORTS);
categoryList.push(CategoryList.STUDY);
categoryList.push(CategoryList.BABY);
categoryList.push(CategoryList.RELIGION);
categoryList.push(CategoryList.GAME);
categoryList.push(CategoryList.FOOD);
categoryList.push(CategoryList.ANIMAL);
categoryList.push(CategoryList.CULTURE);
categoryList.push(CategoryList.SHOPPING);
categoryList.push(CategoryList.ETC);

export { categoryList };
