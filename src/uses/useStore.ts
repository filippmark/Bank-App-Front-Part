/* eslint-disable */
import { DispatchOptions } from 'vuex';
import { computed } from '@vue/composition-api';
import { store } from '@/store/store';

export function useStore(nameSpace: string) {
  return {
    useActions: (map: string[]) => {
      const obj: any = {};
      map.forEach((m) => {
        obj[m] = async (payload: any, options: DispatchOptions) => {
          return store.dispatch(`${nameSpace}/${m}`, payload, options);
        };
      });
      return obj;
    },
    useGetters: (map: string[]) => {
      const obj: any = {};
      map.forEach((m) => {
        obj[m] = store.getters[`${nameSpace}/${m}`];
      });
      return obj;
    },
    useMutations: (map: string[]) => {
      const obj: any = {};
      map.forEach((m) => {
        obj[m] = async (payload: any, options: DispatchOptions) => {
          return store.commit(`${nameSpace}/${m}`, payload, options);
        };
      });
      return obj;
    },
    useState: (map: string[]) => {
      const obj: any = {};
      map.forEach((m) => {
        obj[m] = computed((): any => (store.state as any)[nameSpace][m]);
      });
      return obj;
    },
    useNestedState: (map: string[]) => {
      const obj: any = {};
      const modules = nameSpace.split('/');
      map.forEach((m) => {
        obj[m] = computed((): any => {
          return modules.reduce((obj, mod) => {
            return obj[mod];
          }, store.state as any)[m];
        });
      });
      return obj;
    },
  };
}
