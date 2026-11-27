export const categories = [
  {id:'horeca',name:'Horeca',image:'/assets/sorsme-horeca.webp',description:'Hotel, restaurant and café equipment, furniture, tableware and supplies.'},
  {id:'food',name:'Food & Beverage',image:'/assets/sorsme-food.webp',description:'Discover food products and beverage sourcing opportunities.'},
  {id:'furniture',name:'Furniture',image:'/assets/sorsme-furniture.webp',description:'Furniture for hospitality, commercial and residential spaces.'},
  {id:'textiles',name:'Textiles',image:'/assets/sorsme-textiles.webp',description:'Cotton towels, linens and textiles for your business.'},
  {id:'packaging',name:'Packaging',image:'/assets/sorsme-packaging.webp',description:'Paper, cardboard and custom packaging solutions.'},
  {id:'industrial',name:'Industrial Products',image:'/assets/sorsme-industrial.webp',description:'Components, equipment and manufacturing supplies.'},
  {id:'construction',name:'Construction Materials',image:'/assets/sorsme-construction.webp',description:'Tiles, stone and materials for your next project.'},
  {id:'custom',name:'Other Custom Sourcing',image:'/assets/sorsme-custom.webp',description:'Tell us what you need. We help you explore the possibilities.'},
];
export const products = [
  {id:'restaurant-chair',name:'Restaurant Chair',category:'furniture',type:'Seating',application:'Hospitality',description:'A comfortable upholstered chair for restaurants, hotels and cafés.',material:'Wood frame / upholstery',image:'/assets/sorsme-furniture.webp'},
  {id:'bath-towel',name:'Bath Towel',category:'textiles',type:'Hotel textiles',application:'Hospitality',description:'Soft cotton towels for hotel, spa and professional hospitality use.',material:'Cotton',image:'/assets/sorsme-textiles.webp'},
  {id:'olive-oil',name:'Olive Oil',category:'food',type:'Food products',application:'Food service',description:'Explore Turkish olive oil options for retail and food service.',material:'Olive oil / glass packaging',image:'/assets/sorsme-food.webp'},
  {id:'porcelain-tile',name:'Porcelain Tile',category:'construction',type:'Building materials',application:'Commercial projects',description:'Stone-look tile options for residential and commercial projects.',material:'Porcelain',image:'/assets/sorsme-construction.webp'},
  {id:'restaurant-tableware',name:'Restaurant Tableware',category:'horeca',type:'Tableware',application:'Hospitality',description:'Porcelain and glassware options for thoughtfully set tables.',material:'Porcelain / glass',image:'/assets/sorsme-horeca.webp'},
  {id:'paper-packaging',name:'Paper Packaging',category:'packaging',type:'Packaging',application:'Food service',description:'Paper cups, takeaway containers and packaging for everyday use.',material:'Paper / cardboard',image:'/assets/sorsme-packaging.webp'},
  {id:'industrial-gears',name:'Industrial Components',category:'industrial',type:'Components',application:'Manufacturing',description:'Explore industrial components to suit your specification.',material:'Metal',image:'/assets/sorsme-industrial.webp'},
  {id:'custom-products',name:'Custom Product Sourcing',category:'custom',type:'Custom products',application:'Commercial projects',description:'A sourcing enquiry tailored to your business requirements.',material:'According to your specification',image:'/assets/sorsme-custom.webp'},
];
export const plans = [
  {id:'database',name:'Sourcing Database',price:15,unit:'month',features:['Access to a curated supplier database','Explore product and supplier information','Browse across sourcing categories'],cta:'Explore the Database'},
  {id:'standard',name:'Sourcing Quotation',price:20,unit:'request',features:['Quotation for up to 50 products','Supplier search and quotation collection','Comparative quotations for evaluation','Order assistance after confirmation','Optional inspection and photo updates'],cta:'Request a Quotation'},
  {id:'large',name:'Large Sourcing Quotation',price:45,unit:'request',features:['Quotation for 51–200 products','Comprehensive supplier search','Consolidated and comparative quotations','Ideal for larger or multi-category needs','Optional inspection and photo updates'],cta:'Request a Large Quotation'},
];
export function quotationPrice(count:number) { if (!Number.isInteger(count) || count < 1 || count > 200) return null; return count <= 50 ? 20 : 45; }
export function requestCategoriesValid(ids:string[]) { return ids.length > 0 && ids.every(id => categories.some(c => c.id === id)); }
export const paymentPolicy = {servicePayee:'SorsMe',goodsPayee:'Suppliers directly'};
export function pageHead(title:string,description:string) { return {meta:[{title:`${title} | SorsMe`},{name:'description',content:description},{property:'og:title',content:`${title} | SorsMe`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}; }

const hero = 'https://images.unsplash.com/photo-1546069906-ba287f0815ed?w=1600&q=80';
const horeca = 'https://images.unsplash.com/photo-1598300054260-640387c7a781?w=1600&q=80';
const food = 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1600&q=80';
const furniture = 'https://images.unsplash.com/photo-1598300054260-640387c7a781?w=1600&q=80';
const textiles = 'https://images.unsplash.com/photo-1606318156168-9a5a5a8c4c2e?w=1600&q=80';
const packaging = 'https://images.unsplash.com/photo-1613479416676-2f9c6b6a1e5e?w=1600&q=80';
const industrial = 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1600&q=80';
const construction = 'https://images.unsplash.com/photo-1606318156168-9a5a5a8c4c2e?w=1600&q=80';
const custom = 'https://images.unsplash.com/photo-1598300054260-640387c7a781?w=1600&q=80';