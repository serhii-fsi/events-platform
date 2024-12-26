import Link from 'next/link';
import { AuthStatus } from '@/components/AuthStatus';
import { Menu } from '@/components/Menu';

export const Header = async () => {
  return (
    <header className="flex justify-between items-center">
      <div>
        <Link href="/">
          <svg
            className="text-foreground"
            width="191"
            height="87"
            viewBox="0 0 191 87"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.6009 54.6179C15.1776 54.6179 12.223 53.9432 9.73722 52.5938C7.26563 51.2301 5.36222 49.2912 4.02699 46.777C2.70597 44.2486 2.04545 41.2443 2.04545 37.7642C2.04545 34.3835 2.71307 31.429 4.0483 28.9006C5.38352 26.358 7.26562 24.3835 9.6946 22.9773C12.1236 21.5568 14.9858 20.8466 18.2812 20.8466C20.6108 20.8466 22.7415 21.2088 24.6733 21.9332C26.6051 22.6577 28.2741 23.7301 29.6804 25.1506C31.0866 26.571 32.1804 28.3253 32.9616 30.4134C33.7429 32.4872 34.1335 34.8665 34.1335 37.5511V40.1506H5.68892V34.0994H24.4389C24.4247 32.9915 24.1619 32.0043 23.6506 31.1378C23.1392 30.2713 22.4361 29.5966 21.5412 29.1136C20.6605 28.6165 19.6449 28.3679 18.4943 28.3679C17.3295 28.3679 16.2855 28.6307 15.3622 29.1562C14.4389 29.6676 13.7074 30.3707 13.1676 31.2656C12.6278 32.1463 12.3438 33.1477 12.3153 34.2699V40.4276C12.3153 41.7628 12.5781 42.9347 13.1037 43.9432C13.6293 44.9375 14.375 45.7116 15.3409 46.2656C16.3068 46.8196 17.4574 47.0966 18.7926 47.0966C19.7159 47.0966 20.554 46.9687 21.3068 46.7131C22.0597 46.4574 22.706 46.081 23.2457 45.5838C23.7855 45.0866 24.1903 44.4759 24.4602 43.7514L34.027 44.0284C33.6293 46.1733 32.7557 48.0412 31.4062 49.6321C30.071 51.2088 28.3168 52.4375 26.1435 53.3182C23.9702 54.1847 21.456 54.6179 18.6009 54.6179ZM67.9232 21.2727L56.6945 54H44.7626L33.5553 21.2727H44.5283L50.5581 43.8153H50.899L56.9501 21.2727H67.9232ZM83.7618 54.6179C80.3385 54.6179 77.3839 53.9432 74.8982 52.5938C72.4266 51.2301 70.5232 49.2912 69.1879 46.777C67.8669 44.2486 67.2064 41.2443 67.2064 37.7642C67.2064 34.3835 67.874 31.429 69.2092 28.9006C70.5445 26.358 72.4266 24.3835 74.8555 22.9773C77.2845 21.5568 80.1467 20.8466 83.4422 20.8466C85.7717 20.8466 87.9024 21.2088 89.8342 21.9332C91.766 22.6577 93.4351 23.7301 94.8413 25.1506C96.2476 26.571 97.3413 28.3253 98.1226 30.4134C98.9038 32.4872 99.2945 34.8665 99.2945 37.5511V40.1506H70.8499V34.0994H89.5999C89.5857 32.9915 89.3229 32.0043 88.8115 31.1378C88.3001 30.2713 87.597 29.5966 86.7021 29.1136C85.8214 28.6165 84.8058 28.3679 83.6553 28.3679C82.4905 28.3679 81.4464 28.6307 80.5232 29.1562C79.5999 29.6676 78.8683 30.3707 78.3285 31.2656C77.7888 32.1463 77.5047 33.1477 77.4763 34.2699V40.4276C77.4763 41.7628 77.7391 42.9347 78.2646 43.9432C78.7902 44.9375 79.5359 45.7116 80.5018 46.2656C81.4678 46.8196 82.6183 47.0966 83.9535 47.0966C84.8768 47.0966 85.7149 46.9687 86.4678 46.7131C87.2206 46.4574 87.8669 46.081 88.4067 45.5838C88.9464 45.0866 89.3513 44.4759 89.6212 43.7514L99.1879 44.0284C98.7902 46.1733 97.9166 48.0412 96.5672 49.6321C95.232 51.2088 93.4777 52.4375 91.3044 53.3182C89.1311 54.1847 86.6169 54.6179 83.7618 54.6179ZM112.635 35.3352V54H102.216V21.2727H112.124V27.2812H112.486C113.21 25.2784 114.446 23.7088 116.193 22.5724C117.94 21.4219 120.021 20.8466 122.436 20.8466C124.737 20.8466 126.733 21.3651 128.423 22.402C130.128 23.4247 131.449 24.8594 132.386 26.706C133.338 28.5384 133.807 30.6832 133.793 33.1406V54H123.374V35.1861C123.388 33.3679 122.926 31.9474 121.989 30.9247C121.065 29.902 119.78 29.3906 118.132 29.3906C117.038 29.3906 116.072 29.6321 115.234 30.1151C114.41 30.5838 113.771 31.2585 113.317 32.1392C112.876 33.0199 112.649 34.0852 112.635 35.3352ZM156.316 21.2727V28.9432H135.67V21.2727H156.316ZM139.995 13.4318H150.414V43.7088C150.414 44.348 150.514 44.8665 150.712 45.2642C150.926 45.6477 151.231 45.9247 151.629 46.0952C152.026 46.2514 152.502 46.3295 153.056 46.3295C153.454 46.3295 153.873 46.294 154.313 46.223C154.768 46.1378 155.109 46.0668 155.336 46.0099L156.913 53.5312C156.416 53.6733 155.712 53.8509 154.803 54.0639C153.909 54.277 152.836 54.4119 151.586 54.4688C149.143 54.5824 147.048 54.2983 145.301 53.6165C143.568 52.9205 142.239 51.8409 141.316 50.3778C140.407 48.9148 139.967 47.0753 139.995 44.8594V13.4318ZM187.395 31.2656L177.828 31.5213C177.728 30.8395 177.458 30.2358 177.018 29.7102C176.578 29.1705 176.002 28.7514 175.292 28.4531C174.596 28.1406 173.787 27.9844 172.863 27.9844C171.656 27.9844 170.626 28.2259 169.774 28.7088C168.936 29.1918 168.524 29.8452 168.538 30.669C168.524 31.3082 168.779 31.8622 169.305 32.331C169.845 32.7997 170.804 33.1761 172.181 33.4602L178.488 34.6534C181.755 35.2784 184.184 36.3153 185.775 37.7642C187.38 39.2131 188.19 41.1307 188.204 43.517C188.19 45.7614 187.522 47.7145 186.201 49.3764C184.895 51.0384 183.105 52.331 180.832 53.2543C178.559 54.1634 175.96 54.6179 173.034 54.6179C168.36 54.6179 164.674 53.6591 161.975 51.7415C159.291 49.8097 157.757 47.2244 157.373 43.9858L167.664 43.7301C167.892 44.9233 168.481 45.8324 169.433 46.4574C170.385 47.0824 171.599 47.3949 173.076 47.3949C174.412 47.3949 175.498 47.1463 176.336 46.6491C177.174 46.152 177.6 45.4915 177.615 44.6676C177.6 43.929 177.274 43.3395 176.635 42.8991C175.995 42.4446 174.994 42.0895 173.63 41.8338L167.92 40.7472C164.639 40.1506 162.196 39.0497 160.591 37.4446C158.985 35.8253 158.19 33.7656 158.204 31.2656C158.19 29.0781 158.772 27.2102 159.951 25.6619C161.13 24.0994 162.806 22.9062 164.98 22.0824C167.153 21.2585 169.717 20.8466 172.672 20.8466C177.103 20.8466 180.598 21.777 183.154 23.6378C185.711 25.4844 187.125 28.027 187.395 31.2656Z"
              fill="currentColor"
            />
            <path
              d="M116.786 80.6818V67.1818H119.88V68.8629H119.976C120.103 68.5646 120.285 68.277 120.519 68C120.758 67.723 121.06 67.4972 121.427 67.3224C121.797 67.1435 122.24 67.054 122.756 67.054C123.438 67.054 124.075 67.233 124.667 67.5909C125.264 67.9489 125.745 68.5007 126.112 69.2464C126.478 69.9922 126.662 70.9425 126.662 72.0973C126.662 73.2095 126.485 74.1406 126.131 74.8906C125.782 75.6406 125.309 76.2031 124.712 76.5781C124.12 76.9531 123.461 77.1406 122.737 77.1406C122.243 77.1406 121.814 77.0597 121.452 76.8977C121.09 76.7358 120.785 76.5227 120.538 76.2585C120.295 75.9943 120.108 75.7109 119.976 75.4084H119.912V80.6818H116.786ZM119.848 72.0909C119.848 72.6193 119.918 73.0795 120.059 73.4716C120.204 73.8636 120.41 74.1683 120.679 74.3857C120.951 74.5987 121.277 74.7053 121.657 74.7053C122.04 74.7053 122.366 74.5987 122.635 74.3857C122.903 74.1683 123.106 73.8636 123.242 73.4716C123.383 73.0795 123.453 72.6193 123.453 72.0909C123.453 71.5625 123.383 71.1044 123.242 70.7166C123.106 70.3288 122.903 70.0284 122.635 69.8153C122.37 69.6023 122.044 69.4957 121.657 69.4957C121.273 69.4957 120.947 69.6001 120.679 69.8089C120.41 70.0178 120.204 70.3161 120.059 70.7038C119.918 71.0916 119.848 71.554 119.848 72.0909ZM131.245 63.9091V77H128.12V63.9091H131.245ZM135.823 77.1662C135.196 77.1662 134.64 77.0618 134.154 76.853C133.673 76.6399 133.291 76.3203 133.01 75.8942C132.733 75.4638 132.595 74.9247 132.595 74.277C132.595 73.7315 132.69 73.2713 132.882 72.8963C133.074 72.5213 133.338 72.2166 133.675 71.9822C134.012 71.7479 134.399 71.571 134.838 71.4517C135.277 71.3281 135.746 71.245 136.244 71.2024C136.803 71.1513 137.252 71.098 137.593 71.0426C137.934 70.983 138.181 70.8999 138.335 70.7933C138.492 70.6825 138.571 70.527 138.571 70.3267V70.2947C138.571 69.9666 138.458 69.7131 138.232 69.5341C138.007 69.3551 137.702 69.2656 137.318 69.2656C136.905 69.2656 136.573 69.3551 136.321 69.5341C136.07 69.7131 135.91 69.9602 135.842 70.2756L132.959 70.1733C133.044 69.5767 133.264 69.044 133.617 68.5753C133.975 68.1023 134.465 67.7315 135.088 67.4631C135.714 67.1903 136.466 67.054 137.344 67.054C137.97 67.054 138.548 67.1286 139.076 67.2777C139.605 67.4226 140.065 67.6357 140.457 67.9169C140.849 68.1939 141.151 68.5348 141.364 68.9396C141.582 69.3445 141.69 69.8068 141.69 70.3267V77H138.75V75.6321H138.673C138.499 75.9645 138.275 76.2457 138.002 76.4759C137.734 76.706 137.416 76.8786 137.05 76.9936C136.688 77.1087 136.279 77.1662 135.823 77.1662ZM136.788 75.1207C137.124 75.1207 137.427 75.0526 137.695 74.9162C137.968 74.7798 138.186 74.5923 138.347 74.3537C138.509 74.1108 138.59 73.8295 138.59 73.5099V72.5767C138.501 72.6236 138.392 72.6662 138.264 72.7045C138.141 72.7429 138.004 72.7791 137.855 72.8132C137.706 72.8473 137.553 72.8771 137.395 72.9027C137.237 72.9283 137.086 72.9517 136.941 72.973C136.647 73.0199 136.396 73.0923 136.187 73.1903C135.982 73.2884 135.825 73.4162 135.714 73.5739C135.607 73.7273 135.554 73.9105 135.554 74.1236C135.554 74.4474 135.669 74.6946 135.899 74.8651C136.134 75.0355 136.43 75.1207 136.788 75.1207ZM148.964 67.1818V69.483H142.77V67.1818H148.964ZM144.067 64.8295H147.193V73.9126C147.193 74.1044 147.223 74.2599 147.283 74.3793C147.346 74.4943 147.438 74.5774 147.557 74.6286C147.677 74.6754 147.819 74.6989 147.986 74.6989C148.105 74.6989 148.231 74.6882 148.363 74.6669C148.499 74.6413 148.601 74.62 148.67 74.603L149.143 76.8594C148.993 76.902 148.783 76.9553 148.51 77.0192C148.241 77.0831 147.92 77.1236 147.545 77.1406C146.812 77.1747 146.183 77.0895 145.659 76.8849C145.139 76.6761 144.741 76.3523 144.464 75.9134C144.191 75.4744 144.059 74.9226 144.067 74.2578V64.8295ZM155.959 67.1818V69.483H149.643V67.1818H155.959ZM150.96 77V66.6832C150.96 65.9247 151.103 65.2962 151.388 64.7976C151.674 64.2947 152.07 63.9197 152.577 63.6726C153.084 63.4212 153.67 63.2955 154.335 63.2955C154.77 63.2955 155.179 63.3295 155.562 63.3977C155.95 63.4616 156.238 63.5192 156.425 63.5703L155.927 65.8587C155.812 65.8203 155.671 65.7884 155.505 65.7628C155.343 65.7372 155.19 65.7244 155.045 65.7244C154.678 65.7244 154.427 65.8054 154.29 65.9673C154.154 66.1293 154.086 66.3509 154.086 66.6321V77H150.96ZM161.549 77.1854C160.518 77.1854 159.631 76.9744 158.89 76.5526C158.153 76.1264 157.584 75.5341 157.183 74.7756C156.787 74.0128 156.589 73.1286 156.589 72.1229C156.589 71.1129 156.787 70.2287 157.183 69.4702C157.584 68.7074 158.153 68.1151 158.89 67.6932C159.631 67.267 160.518 67.054 161.549 67.054C162.58 67.054 163.465 67.267 164.202 67.6932C164.943 68.1151 165.512 68.7074 165.908 69.4702C166.309 70.2287 166.509 71.1129 166.509 72.1229C166.509 73.1286 166.309 74.0128 165.908 74.7756C165.512 75.5341 164.943 76.1264 164.202 76.5526C163.465 76.9744 162.58 77.1854 161.549 77.1854ZM161.568 74.8267C161.943 74.8267 162.261 74.7116 162.521 74.4815C162.781 74.2514 162.979 73.9318 163.115 73.5227C163.256 73.1136 163.326 72.6406 163.326 72.1037C163.326 71.5582 163.256 71.081 163.115 70.6719C162.979 70.2628 162.781 69.9432 162.521 69.7131C162.261 69.483 161.943 69.3679 161.568 69.3679C161.18 69.3679 160.852 69.483 160.584 69.7131C160.32 69.9432 160.117 70.2628 159.977 70.6719C159.84 71.081 159.772 71.5582 159.772 72.1037C159.772 72.6406 159.84 73.1136 159.977 73.5227C160.117 73.9318 160.32 74.2514 160.584 74.4815C160.852 74.7116 161.18 74.8267 161.568 74.8267ZM167.931 77V67.1818H170.967V68.9716H171.069C171.248 68.3239 171.54 67.8423 171.945 67.527C172.35 67.2074 172.82 67.0476 173.357 67.0476C173.502 67.0476 173.651 67.0582 173.805 67.0795C173.958 67.0966 174.101 67.1243 174.233 67.1626V69.8793C174.084 69.8281 173.888 69.7876 173.645 69.7578C173.406 69.728 173.193 69.7131 173.006 69.7131C172.635 69.7131 172.301 69.7962 172.002 69.9624C171.708 70.1243 171.476 70.3523 171.306 70.6463C171.139 70.9361 171.056 71.277 171.056 71.669V77H167.931ZM175.327 77V67.1818H178.299V68.9844H178.408C178.612 68.3878 178.957 67.9169 179.443 67.5717C179.929 67.2266 180.509 67.054 181.182 67.054C181.864 67.054 182.447 67.2287 182.933 67.5781C183.419 67.9276 183.728 68.3963 183.86 68.9844H183.962C184.146 68.4006 184.504 67.9339 185.036 67.5845C185.569 67.2308 186.197 67.054 186.922 67.054C187.851 67.054 188.605 67.3523 189.185 67.9489C189.764 68.5412 190.054 69.3551 190.054 70.3906V77H186.928V71.1065C186.928 70.6165 186.803 70.2436 186.551 69.9879C186.3 69.728 185.974 69.598 185.573 69.598C185.143 69.598 184.804 69.7386 184.557 70.0199C184.314 70.2969 184.192 70.6697 184.192 71.1385V77H181.188V71.0746C181.188 70.6186 181.065 70.2585 180.817 69.9943C180.57 69.7301 180.244 69.598 179.839 69.598C179.567 69.598 179.326 69.6641 179.117 69.7962C178.908 69.924 178.744 70.1072 178.625 70.3459C178.51 70.5845 178.452 70.8658 178.452 71.1896V77H175.327Z"
              fill="currentColor"
            />
          </svg>
        </Link>
      </div>
      <div>
        <AuthStatus />
      </div>
      <div className="w-[191px] flex justify-end ">
        <Menu />
      </div>
    </header>
  );
};
