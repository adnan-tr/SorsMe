import horeca from '@/assets/horeca.webp.asset.json';
import food from '@/assets/food.webp.asset.json';
import furniture from '@/assets/furniture.webp.asset.json';
import textiles from '@/assets/textiles.webp.asset.json';
import packaging from '@/assets/packaging.webp.asset.json';
import industrial from '@/assets/industrial.webp.asset.json';
import construction from '@/assets/construction.webp.asset.json';
import custom from '@/assets/custom.webp.asset.json';
export const categories = [
 {id:'horeca',name:'Horeca',image:horeca.url,description:'Hotel, restaurant and café equipment, furniture, tableware and supplies.'},
 {id:'food',name:'Food & Beverage',image:food.url,description:'Discover food products and beverage sourcing opportunities.'},
 {id:'furniture',name:'Furniture',image:furniture.url,description:'Furniture for hospitality, commercial and residential spaces.'},
 {id:'textiles',name:'Textiles',image:textiles.url,description:'Cotton towels, linens and textiles for your business.'},
 {id:'packaging',name:'Packaging',image:packaging.url,description:'Paper, cardboard and custom packaging solutions.'},
 {id:'industrial',name:'Industrial Products',image:industrial.url,description:'Components, equipment and manufacturing supplies.'},
 {id:'construction',name:'Construction Materials',image:construction.url,description:'Tiles, stone and materials for your next project.'},
 {id:'custom',name:'Other Custom Sourcing',image:custom.url,description:'Tell us what you need. We help you explore the possibilities.'},
];
export const products = [
 {id:'restaurant-chair',name:'Restaurant Chair',category:'furniture',type:'Seating',application:'Hospitality',description:'A comfortable upholstered chair for restaurants, hotels and cafés.',material:'Wood frame / upholstery',image:furniture.url},
 {id:'bath-towel',name:'Bath Towel',category:'textiles',type:'Hotel textiles',application:'Hospitality',description:'Soft cotton towels for hotel, spa and professional hospitality use.',material:'Cotton',image:textiles.url},
 {id:'olive-oil',name:'Olive Oil',category:'food',type:'Food products',application:'Food service',description:'Explore Turkish olive oil options for retail and food service.',material:'Olive oil / glass packaging',image:food.url},
 {id:'porcelain-tile',name:'Porcelain Tile',category:'construction',type:'Building materials',application:'Commercial projects',description:'Stone-look tile options for residential and commercial projects.',material:'Porcelain',image:construction.url},
 {id:'restaurant-tableware',name:'Restaurant Tableware',category:'horeca',type:'Tableware',application:'Hospitality',description:'Porcelain and glassware options for thoughtfully set tables.',material:'Porcelain / glass',image:horeca.url},
 {id:'paper-packaging',name:'Paper Packaging',category:'packaging',type:'Packaging',application:'Food service',description:'Paper cups, takeaway containers and packaging for everyday use.',material:'Paper / cardboard',image:packaging.url},
 {id:'industrial-gears',name:'Industrial Components',category:'industrial',type:'Components',application:'Manufacturing',description:'Explore industrial components to suit your specification.',material:'Metal',image:industrial.url},
 {id:'custom-products',name:'Custom Product Sourcing',category:'custom',type:'Custom products',application:'Commercial projects',description:'A sourcing enquiry tailored to your business requirements.',material:'According to your specification',image:custom.url},
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
