

type Product = {
    id: number | null,
    name: string | null,
    slug: string | null,
    permalink: string | null,
    date_created: string | null,
    date_created_gmt: string | null,
    date_modified: string | null,
    date_modified_gmt: string | null,
    type: string | null,
    status: string | null,
    featured: boolean | null,
    catalog_visibility: string | null,
    description: string | null,
    short_description: string | null,
    sku: string | null,
    price: string | null,
    regular_price: string | null,
    sale_price: string | null,
    date_on_sale_from: string | null,
    date_on_sale_from_gmt: string | null,
    date_on_sale_to: string | null,
    date_on_sale_to_gmt: string | null,
    on_sale: boolean | null,
    purchasable: boolean | null,
    total_sales: number | null,
    virtual: boolean | null,
    downloadable: boolean | null,
    downloads: string[] | null,
    download_limit: number | null,
    download_expiry: number | null,
    external_url: string | null,
    button_text: string | null,
    tax_status: string | null,
    tax_class: string | null,
    manage_stock: boolean | null,
    stock_quantity: number | null,
    backorders: string | null,
    backorders_allowed: boolean | null,
    backordered: boolean | null,
    low_stock_amount: boolean | null,
    sold_individually: boolean | null,
    weight: string,
    dimensions: Dimensions,
    shipping_required: boolean | null,
    shipping_taxable: boolean | null,
    shipping_class: string | null,
    shipping_class_id: number | null,
    reviews_allowed: boolean | null,
    average_rating: string | null,
    rating_count: number | null,
    upsell_ids: string[],
    cross_sell_ids: string[],
    parent_id: number | null,
    purchase_note: string | null,
    categories: Category[],
    tags: [],
    images: Image[] | null,
    attributes: Attribute[] | null,
    default_attributes: [
        { id: number, name: string, option: string },
    ],
    variations: number[],
    grouped_products: [],
    menu_order: number,
    price_html: string,
    related_ids: [],
    meta_data: [],
    stock_status: string,
    has_options: true,
    post_password: '',
    _links: {
        self: [[Object]], collection: [[Object]]
    }
}


type Dimensions = {
    length: string,
    width: string,
    height: string,
}

type Category = {
    id: string,
    name: string,
    slug: string,
}

type Image = {
    id: number,
    date_created: string,
    date_created_gmt: string,
    date_modified: string,
    date_modified_gmt: string,
    src: string,
    name: string
}

type Attribute = {
    id: number,
    name: string,
    position: number,
    visible: boolean,
    variation: boolean,
    options: [Array] | null
}
type ResponseData = {
    success: boolean,
    products: Array<Product>
}
type Cart = {
    cart_hash: string
    cart_key: string
    coupons: any
    cross_sells: any
    currency: any
    customer: any
    fees: any
    item_count: number
    items: any
    items_weight: number
    needs_payment: boolean
    needs_shipping: boolean
    notices: any
    removed_items: any
    shipping: any
    taxes: any
    totals: any
}

type Customer = {
    email: string,
    first_name: string,
    last_name: string,
    username: string,
    billing: {
        first_name: string,
        last_name: string,
        company: string,
        address_1: string,
        address_2: string,
        city: string,
        state: string,
        postcode: string,
        country: string,
        email: string,
        phone: string
    },
    shipping: {
        first_name: string,
        last_name: string,
        company: string,
        address_1: string,
        address_2: string,
        city: string,
        state: string,
        postcode: string,
        country: string,
    }
}