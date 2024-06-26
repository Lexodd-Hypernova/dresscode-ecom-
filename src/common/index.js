const baseUrl = "https://dresscode-test.onrender.com"

const DressCodeApi = {
    getGroups: {
        url: `${baseUrl}/e-com/getGroups`,
    },
    getCategories: {
        url: `${baseUrl}/e-com/getCategories`,
    },
    getSubCategories: {
        url: `${baseUrl}/e-com/getSubCategories`,
    },
    getProductTypes: {
        url: `${baseUrl}/e-com/getProductTypes`,
    },
    getProductFilters: {
        url: `${baseUrl}/e-com/getProductFilters`,
    },
    getProductsByFilters: {
        url: `${baseUrl}/e-com/getProductsByFilters`,
    },
    getProductDetailsWithSpecificVariant: {
        url: `${baseUrl}/e-com/getProductDetailsWithSpecificVariant`,
    },
}


export default DressCodeApi;