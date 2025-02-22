import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super(<string>process.env.API_URL, {
            apiKey: <string>process.env.API_KEY,
        });
    }
}

export default AppLoader;
