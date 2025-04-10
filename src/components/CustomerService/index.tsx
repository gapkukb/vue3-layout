import { platform } from '@/helpers';
import { delay } from '@/helpers/delay';
import loading from '@/components/Loading';
import type { SetupContext } from 'vue';
import { yamiLoader } from 'yami-loader';

let _el: HTMLElement | null = null;
async function loadSDK() {
  if (_el) return _el;
  loading.open();
  const waitZohoReady = new Promise<HTMLElement>((resolve) => {
    window.$zoho = window.$zoho || {};
    $zoho.salesiq = $zoho.salesiq || {
      widgetcode: '09d594fe613eafb49497e17059d1c9cc2d8bdadf0a9b4880fa95cad1e72eee0e',
      values: {},
      ready: () => {
        $zoho.salesiq.floatbutton.visible('hide');
        $zoho.salesiq.chat.waittime(3600);
      },
      onload() {
        loading.close();
        resolve(document.getElementById('zsiq_agtpic')!);
      },
    };
  });

  [_el] = await Promise.all([waitZohoReady, yamiLoader.loadScript('https://salesiq.zoho.com/widget')]);
  return _el;
}

async function OPEN_CUSTOMER_SERVICE() {
  const el = await loadSDK();
  platform.openApp('customer').to(() => el.click());
}

export default function CustomerService(props, { slots }: SetupContext) {
  const vNode = slots.default?.();

  if (vNode?.length !== 1) throw new Error('CustomerService component must have exactly one child element');

  for (const node of vNode) {
    node.props = node.props || {};
    const origin = node.props.onClick;
    node.props.onClick = () => {
      OPEN_CUSTOMER_SERVICE();
      origin?.();
    };
  }

  return vNode;
}
