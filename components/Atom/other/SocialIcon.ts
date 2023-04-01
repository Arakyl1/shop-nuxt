import { h } from 'vue'

const arrayImage = ref<string[]>(['vkontakte', 'facebook', 'instagram', 'youtybe'])

export default (props: any) => {
    return h('ul', {
        class: 'flex'
    }, arrayImage.value.map(el => {
        return h('li', { class: 'mr-2 last:mr-0'},[h(
          'img', { src: `/img/iconSocials/${el}.png`, alt: el }
          )]
        )
    }))
}
