import { Client } from "@/types/client";
import { reactive, ref, Ref } from "@vue/composition-api"

interface State {
    client: Client;
    loading: boolean;
    isBirtdayMenuOpen: boolean;
    isIssueDateOpen: boolean;
}

export const useClientForm = () => {
    
    const state: State = reactive<State>({
        client: {
            name: '',
            surname: '',
            middleName: '',
            passportNumber: '',
            birthDate: '',
            sex: false,
            passportSeries: '',
            issuer: '',
            issueDate: '',
            passportId: '',
            placeOfBirth: '',
            livingAddress: '',
            mobilePhone: '',
            homePhone: '',
            email: '',
            placeOfWork: '',
            position: '',
            placeOfResidence: '',
            isPensioner: false,
            isLiableForMilitary: false,
            monthlyIncome: 0,
            citizenship: null,
            disability: null,
            regTown: null,
            actualTown: null,
        },
        isBirtdayMenuOpen: false,
        isIssueDateOpen: false,
        loading: false,
    });

    return {
        state,
    }
}