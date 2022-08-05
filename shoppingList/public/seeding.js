const meatList = ['Heading:Meat', 'Whole Chicken', 'Steak', 'Side Ribs', 'Short Ribs', 'Chicken Thighs', 'Chicken Breast',
    'Pork Belly', 'Bacon']

const diaryEggsBakery = ['Heading:Diary Eggs & Bakery', 'Eggs', 'Bread', 'Milk', 'Cheddar Cheese', 'Parmesan Cheese', 'Mozzarella', 'Cured Meat', 'Butter']

const veggie = ['Heading:Veggies', 'Fennel', 'Kohlrabi', 'Potatoes', 'Radish', 'Cucumber', 'Tomatoes', 'Lemon', 'Lime', 'Avocado', 'Cauliflower',
    'Broccoli', 'Asparagus', 'Celeriac', 'Rutabaga']

const fruits = ['Heading:Fruits','Apples', 'Bananas', 'Watermelon', 'Oranges', 'Pomelo']

const foodCupboard = ['Heading:Food Cupboard','Tinned Tomatoes', 'Tinned Tuna', 'Anchovies', 'Olives', 'Capers', 'Banana Peppers',
    'Tomato Purees', 'Black Beans', 'Butter Beans', 'Peanut Butter', 'Strawberry Jam' ]

const grainsNoodles = ['Heading:Grains & Noodles','White Rice', 'Brown Rice', 'Quinoa', 'Pearl Barley', 'Bulgar Wheat', 'Couscous',
    'Buccatini', 'Rigatoni', 'Lasagne Sheets', 'Pappardella', 'Udon', 'Egg Noodles' ]

const herb = ['Heading:Herbs','Fresh Mint', 'Parsley', 'Thyme', 'Sage', 'Cilantro', 'Rosemary']

const driedHerbSpices = ['Heading:Dried Herbs & Spices','Paprika', 'Cumin', 'Oregano', 'Salt', 'Black Pepper', 'Sugar']

const cookingSauces = ['Heading:Cooking Sauces','Fancy Olive Oil', 'Cooking Olive Oil', 'Grapeseeds Oil', 'Balsamic Vinegar', 'Soy Sauce', 'Chipotle Sauce',
    'White Wine Vinegar', 'Franks Sauce', 'Mustard', 'Ketchup', 'Mirin', 'Fish Sauce', 'Mayonnaise' ]

const household = ['Heading:Household','Washing-up Liquid', 'Dishwashing Tablets', 'Rinse Aid', 'Hand Wash Liquid', 'Toilet Paper', 'Paper Towels',
    'Toothpaste', 'Dental Floss', 'Sanitary Towels', 'Shower Gel', 'Toilet Cleaner', 'All Purpose Cleaner', 'Bathroom Cleaner', 'Drain Unblocker']


export const displayOrder = new Map([['Meat', 1], ['Diary Eggs & Bakery', 2], ['Veggies', 3], ['Fruits', 4], ['Herbs', 5], ['Food Cupboard', 6],
    ['Grains & Noodles',7], ['Dried Herbs & Spices', 8], ['Cooking Sauces', 9], ['Household', 10]])


export const defaultList = ['Cured Meat', 'Black Beans', 'Peanut Butter', 'Bananas', 'Apples', 'Kohlrabi', 'Fennel', 'Lime', 'Lemon',
    'Tomatoes', 'Avocado', 'Eggs', 'Milk', 'Bread', 'Side Ribs', 'Chicken Thighs', 'Chicken Breast']

function createMap(...shoppingLists) {
    const shoppingItemByCategories = new Map();
    for(const list of shoppingLists){
        let category;
        for (const item of list){
            if (item.split(':').length > 1) {
                category = item.split(':')[1]
            } else {
                shoppingItemByCategories.set(item, category);
            }
        }
    }
    return shoppingItemByCategories
}

export const shoppingItemByCategories = createMap(meatList, diaryEggsBakery, veggie, fruits, herb, foodCupboard, grainsNoodles, driedHerbSpices, cookingSauces, household)

function createShoppingCategoryByItems(...shoppingLists){
    const shoppingCategoryByItems = new Map();
    for(const list of shoppingLists){
        let category;
        const itemList = []
        for (const item of list){
            if (item.split(':').length > 1) {
                category = item.split(':')[1]
            } else {
                itemList.push(item)
            }
        }
        shoppingCategoryByItems.set(category, itemList)
    }
    return shoppingCategoryByItems
}

export const shoppingCategoryByItems = createShoppingCategoryByItems(meatList, diaryEggsBakery, veggie, fruits, herb, foodCupboard, grainsNoodles, driedHerbSpices, cookingSauces, household)
