import {Directive} from 'vue'

const auth: Directive = {
  mounted(el, binding) {
    const { value } = binding;
    const powerList = ['btn0', 'btn1', 'btn2', 'btn3']
    if(value && value.length > 0) {
      const isPower = powerList.some( (el) => {
        return value.includes(el)
      })
      if(!isPower) {
        el.style.display = 'none'
      }
    } else {
      throw new Error('no power')
    }
  },
}

export default auth;