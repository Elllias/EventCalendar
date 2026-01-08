import moment, {Moment} from "moment";

export const rules = {
    required: (message: string = "Обязательное поле") => ({
        required: true,
        message: message
    }),
    isDateAfter: (message: string) => () => ({
        validator(_: any, date: Moment) {
            if (!date) {
                return Promise.reject();
            }

            const currentMoment = moment();

            if (date.isSame(currentMoment, "day") || date.isAfter(currentMoment)) {
                return Promise.resolve();
            }

            return Promise.reject(new Error(message));
        }
    })
}
