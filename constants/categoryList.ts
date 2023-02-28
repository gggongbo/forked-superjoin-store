import * as CategoryList from './category';

import { CategoryType } from '@constants/types/category';

const categoryList: CategoryType[] = [];
categoryList.push(CategoryList.SPORTS);
categoryList.push(CategoryList.ART);
categoryList.push(CategoryList.HOBBY);
categoryList.push(CategoryList.FOOD);
categoryList.push(CategoryList.CREATIVE);
categoryList.push(CategoryList.TRIP);
categoryList.push(CategoryList.IMPROVEMENT);
categoryList.push(CategoryList.ETC);

export { categoryList };
