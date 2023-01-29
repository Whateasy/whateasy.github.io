const meatList = ['Heading:Meat', 'Whole Chicken', 'Steak', 'Side Ribs', 'Short Ribs', 'Chicken Thighs', 'Chicken Breast',
    'Pork Belly', 'Bacon', 'Minced Meat', 'Salmon']

const diaryEggsBakery = ['Heading:Diary Eggs & Bakery', 'Eggs', 'Bread', 'Milk', 'Cheddar Cheese', 'Parmesan Cheese', 'Mozzarella', 'Cured Meat', 'Butter', 'Tofu','Cream', 'Yogurt']

const veggie = ['Heading:Veggies', 'Fennel', 'Kohlrabi', 'Potatoes', 'Radish', 'Cucumber', 'Tomatoes', 'Lemon', 'Lime', 'Avocado', 'Cauliflower',
    'Broccoli', 'Asparagus', 'Celeriac', 'Rutabaga', 'Bean Sprouts', 'Sweet corns','Aubergine', 'Courgette', 'Pepper', 'Mushroom', 'Brussels Sprouts', 'Carrots', 'Chestnuts']

const fruits = ['Heading:Fruits','Apples', 'Bananas', 'Watermelon', 'Oranges', 'Pomelo', 'Grapes', 'Pomegranate']

const foodCupboard = ['Heading:Pantry','Tinned Tomatoes', 'Tinned Tuna', 'Anchovies', 'Olives', 'Capers', 'Banana Peppers',
    'Tomato Purees', 'Black Beans', 'Butter Beans', 'Peanut Butter', 'Strawberry Jam', 'Almond Flakes', 'Walnut', 'Raisins', 'Figs', 'Dates', 'Apricots', 'Honey', 'Maple Syrup', 'Coconut Milk' ]

const grainsNoodles = ['Heading:Grains & Noodles','White Rice', 'Brown Rice', 'Quinoa', 'Pearl Barley', 'Bulgar Wheat', 'Couscous',
    'Buccatini', 'Rigatoni', 'Lasagne Sheets', 'Pappardella', 'Udon', 'Egg Noodles', 'Oats', 'Flour' ]

const herb = ['Heading:Herbs','Fresh Mint', 'Parsley', 'Thyme', 'Sage', 'Cilantro', 'Rosemary', 'Lemongrass', 'Ginger', 'Chili']

const driedHerbSpices = ['Heading:Dried Herbs & Spices','Paprika', 'Cumin', 'Oregano', 'Salt', 'Black Pepper', 'Sugar', 'Ground Coriander', 'Ground Ginger', 'Chipotle']

const cookingSauces = ['Heading:Cooking Sauces','Fancy Olive Oil', 'Cooking Olive Oil', 'Grapeseeds Oil', 'Balsamic Vinegar', 'Soy Sauce', 'Chipotle Sauce',
    'White Wine Vinegar', 'Franks Sauce', 'Mustard', 'Ketchup', 'Mirin', 'Fish Sauce', 'Mayonnaise', 'Worcester Sauce', 'Tobasco' ]

const household = ['Heading:Household','Washing-up Liquid', 'Dishwashing Tablets', 'Rinse Aid', 'Hand Wash Liquid', 'Toilet Paper', 'Paper Towels',
    'Toothpaste', 'Dental Floss', 'Shower Gel', 'Toilet Cleaner', 'All Purpose Cleaner', 'Bathroom Cleaner', 'Drain Unblocker', 'Laundry Tablets', 
                   'Coffee Filter', 'Cling Film', 'Parchment Paper', 'Foil', 'Moisturiser', 'Deodrant']

const medicineCabinet = ['Heading:Medicine Cabinet','Sun Tan Cream', 'Bug Spray', 'Pain Killers', 'Sanitary Towels', 'Band Aid' ]

const freezer = ['Heading:Freezer', 'Frozen Sweetcorn', 'Frozen Peas', 'Ice Cream', 'Frozen Spinach']


export const displayOrder = new Map([['Veggies', 1], ['Fruits', 2],  ['Meat', 3], ['Diary Eggs & Bakery', 4], ['Freezer', 5], ['Herbs', 6], ['Pantry', 7],
    ['Grains & Noodles',7], ['Dried Herbs & Spices', 8], ['Cooking Sauces', 9], ['Household', 10], ['Medicine Cabinet', 11]])

export const defaultList = ['Black Beans', 'Bananas', 'Apples', 'Kohlrabi', 'Fennel', 'Lime', 'Lemon',
    'Tomatoes', 'Avocado', 'Eggs', 'Milk', 'Bread', 'Chicken Thighs', 'Chicken Breast']

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

export const shoppingItemByCategories = createMap(meatList, diaryEggsBakery, veggie, fruits, herb, foodCupboard, grainsNoodles, driedHerbSpices, cookingSauces, household, freezer, medicineCabinet)

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

export const shoppingCategoryByItems = createShoppingCategoryByItems(meatList, diaryEggsBakery, veggie, fruits, herb, foodCupboard, grainsNoodles, driedHerbSpices, cookingSauces, household, freezer, medicineCabinet)
