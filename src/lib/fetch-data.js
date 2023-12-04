export const fetchRealtorListings = async () => {


    const url = 'https://realtor.p.rapidapi.com/properties/v3/list';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '46ef5a1703mshb3f96774499d89bp11de13jsnd9087a0e8b4a',
            'X-RapidAPI-Host': 'realtor.p.rapidapi.com'
        },
        body: {
            limit: 200,
            offset: 0,
            postal_code: '90004',
            status: [
                'for_sale',
                'ready_to_build'
            ],
            sort: {
                direction: 'desc',
                field: 'list_date'
            }
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }


    

}