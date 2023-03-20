const SingaporeEnglishLocalization = {
    suffix: "en-SG",
    tenDayTab: "10 Day"
}

const VietnameseLocalization = {
    suffix: "vi-VN",
    tenDayTab: "10 Ngày"
}

export const countryLocalization = () => {
    if(process.env.country == "singapore"){
        return SingaporeEnglishLocalization
    } else if (process.env.country == "vietnam"){
        return VietnameseLocalization
    } else {
        return SingaporeEnglishLocalization
    }
}