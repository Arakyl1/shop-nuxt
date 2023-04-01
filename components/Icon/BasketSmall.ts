import { h } from "vue";

export default (_props: any) => {
    return h('svg', {
        ..._props,
        width: '25',
        height: '25',
        viewBox: '0 0 25 25',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg'
    }, [
        h('path', {
            'd': 'M4.16659 16.6666V4.16665H2.08325V2.08331H5.20825C5.48452 2.08331 5.74947 2.19306 5.94482 2.38841C6.14017 2.58376 6.24992 2.84871 6.24992 3.12498V15.625H19.2062L21.2895 7.29165H8.33325V5.20831H22.6249C22.7833 5.20832 22.9395 5.24442 23.0818 5.31387C23.2241 5.38333 23.3487 5.4843 23.4461 5.60913C23.5435 5.73396 23.6112 5.87935 23.644 6.03426C23.6768 6.18917 23.6738 6.34951 23.6353 6.5031L21.0312 16.9198C20.9747 17.145 20.8447 17.345 20.6616 17.4878C20.4785 17.6307 20.253 17.7083 20.0208 17.7083H5.20825C4.93198 17.7083 4.66703 17.5986 4.47168 17.4032C4.27633 17.2079 4.16659 16.9429 4.16659 16.6666V16.6666ZM6.24992 23.9583C5.69738 23.9583 5.16748 23.7388 4.77678 23.3481C4.38608 22.9574 4.16659 22.4275 4.16659 21.875C4.16659 21.3224 4.38608 20.7925 4.77678 20.4018C5.16748 20.0111 5.69738 19.7916 6.24992 19.7916C6.80245 19.7916 7.33236 20.0111 7.72306 20.4018C8.11376 20.7925 8.33325 21.3224 8.33325 21.875C8.33325 22.4275 8.11376 22.9574 7.72306 23.3481C7.33236 23.7388 6.80245 23.9583 6.24992 23.9583ZM18.7499 23.9583C18.1974 23.9583 17.6675 23.7388 17.2768 23.3481C16.8861 22.9574 16.6666 22.4275 16.6666 21.875C16.6666 21.3224 16.8861 20.7925 17.2768 20.4018C17.6675 20.0111 18.1974 19.7916 18.7499 19.7916C19.3025 19.7916 19.8324 20.0111 20.2231 20.4018C20.6138 20.7925 20.8333 21.3224 20.8333 21.875C20.8333 22.4275 20.6138 22.9574 20.2231 23.3481C19.8324 23.7388 19.3025 23.9583 18.7499 23.9583Z',
            class: 'group-[.icon-black]:fill-black-500 group-[.icon-white]:fill-white'
        })])
}