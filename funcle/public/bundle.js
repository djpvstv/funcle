
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$3=new WeakMap;let n$2 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$3.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new n$2("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$2(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$1.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$1,getOwnPropertySymbols:o$2,getPrototypeOf:n$1}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$1(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$1(t),...o$2(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e,this[e]=h.fromAttribute(s,t.type)??this._$Ej?.get(e)??null,this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){const e=this.constructor,h=this[t];if(i??=e.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(e._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.0");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i$1=t.trustedTypes,s$1=i$1?i$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,e="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$1="?"+h,n=`<${o$1}>`,r=document,l=()=>r.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r.createTreeWalker(r,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$1?s$1.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n:d>=0?(o.push(a),s.slice(0,d)+e+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$1?i$1.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$1)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r).importNode(i,true);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(false,true,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=S(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=t.litHtmlPolyfillSupport;j?.(N,R),(t.litHtmlVersions??=[]).push("3.3.0");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return T}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o=s.litElementPolyfillSupport;o?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.0");

class FuncleInputRow extends i {
  static properties = {
    active: {type: Boolean}
  };

  static styles = i$3`
    @font-face {
      font-family: 'Consolas';
      src: url('../fonts/CONSOLA.tff') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    .grid {
      display: flex;
      gap: 0.3rem;
    }
    .square {
      width: 50px;
      height: 50px;
      border: 2px solid #555;
      font-size: 2rem;
      text-align: center;
      line-height: 60px;
      cursor: pointer;
      user-select: none;
      text-transform: lowercase;
    }
    .square.active {
      border-color: #00aaff;
      background-color: #eef;
    }
    div {
      font-family: 'Consolas', sans-serif;
    }
  `;

  constructor() {
    super();
    this.NUMBER_OF_LETTERS = 5;

    this.letters = Array(this.NUMBER_OF_LETTERS).fill("");
    this.activeIndex = null;
    this.active = false;
    this._handleKey = this._handleKey.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.active) {
      window.addEventListener('keydown', this._handleKey);
      if (this.activeIndex === null) {
        this.activeIndex = 0;
        this.requestUpdate();
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.active) {
      window.removeEventListener('keydown', this._handleKey);
    }
  }

  _handleKey(e) {
    // Ignore unless the selected box in row
    if (this.activeIndex === null) return;

    const key = e.key.toLowerCase();
    if (/^[a-z0-9]$/.test(key)) {
      this.letters[this.activeIndex] = key;
      this.letters = [...this.letters]; // reassign to trigger re-render
      this.activeIndex = (this.activeIndex + 1) % this.NUMBER_OF_LETTERS;
      this.requestUpdate();
    } else if (e.key === 'Backspace') {      this.letters[this.activeIndex] = '';
      this.letters = [...this.letters];
      this.requestUpdate();
    } else if (e.key === "Enter") {
      const guessWord = this.letters.join('');
      if (guessWord.length === this.NUMBER_OF_LETTERS) {
        this.dispatchEvent(new CustomEvent('guess-enter', {
          detail: guessWord,
          bubbles: true,
          composed: true
        }));
      }
    }
  }

  _onClick(index) {
    // Ignore unless the current row is active
    if (!this.active) return;

    this.activeIndex = index;
    this.requestUpdate();
  }

  render() {
    return x`
      <div class="grid">
        ${this.letters.map((letter, i) => x`
          <div
            class="square ${this.activeIndex === i ? 'active' : ''}"
            @click=${() => this._onClick(i)}
          >
            ${letter}
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('funcle-input-row', FuncleInputRow);

var five = [
	"abyss",
	"ac2rc",
	"acker",
	"addin",
	"addmd",
	"addmf",
	"addpv",
	"addss",
	"align",
	"alpha",
	"ammod",
	"anfis",
	"angle",
	"anova",
	"arcov",
	"armax",
	"augss",
	"augtf",
	"autod",
	"axesm",
	"axxbc",
	"balmr",
	"balsq",
	"bar3h",
	"batch",
	"bench",
	"bi2de",
	"bilin",
	"bkbrk",
	"bonne",
	"braun",
	"break",
	"bries",
	"brush",
	"btnup",
	"bvp4c",
	"bvp5c",
	"c2dmp",
	"ca2tf",
	"camup",
	"camva",
	"canon",
	"cardb",
	"cardg",
	"cares",
	"catch",
	"caxis",
	"cc2bw",
	"cceps",
	"cconv",
	"cgnbi",
	"chirp",
	"chstr",
	"cirsb",
	"cirsg",
	"cl2tf",
	"class",
	"clear",
	"clock",
	"cloop",
	"clyap",
	"co2di",
	"comet",
	"comms",
	"convn",
	"corr2",
	"count",
	"covar",
	"covf2",
	"cp2dp",
	"crand",
	"crepe",
	"cross",
	"csape",
	"csapi",
	"csaps",
	"cscvn",
	"csize",
	"csord",
	"ctrbf",
	"cusum",
	"d2cmp",
	"dares",
	"dblnk",
	"dbmex",
	"dbode",
	"dcalc",
	"ddamp",
	"dde23",
	"ddesd",
	"ddex1",
	"ddex2",
	"ddex3",
	"ddex4",
	"ddex5",
	"de2bi",
	"decay",
	"decic",
	"decsg",
	"defcx",
	"delsq",
	"demod",
	"demos",
	"detex",
	"deval",
	"dgram",
	"dhinf",
	"di2co",
	"diary",
	"diric",
	"dload",
	"dlqe2",
	"dlqew",
	"dlqrc",
	"dlqry",
	"dlsim",
	"dlyap",
	"dm2gm",
	"dobal",
	"drum1",
	"drum2",
	"dsave",
	"dsort",
	"dstep",
	"dteds",
	"dtrsp",
	"ecc2n",
	"edge3",
	"ellip",
	"erase",
	"esort",
	"estim",
	"etime",
	"etopo",
	"evalc",
	"evcdf",
	"evfit",
	"evinv",
	"evpdf",
	"evrnd",
	"exist",
	"expmv",
	"fbode",
	"feasp",
	"feval",
	"fgetl",
	"fill3",
	"fillm",
	"filtm",
	"findm",
	"finfo",
	"firgr",
	"firls",
	"firpm",
	"fismf",
	"fitlm",
	"fitrm",
	"fixdt",
	"float",
	"fmesh",
	"fmmod",
	"fn2fm",
	"fnbrk",
	"fnchg",
	"fncmb",
	"fnder",
	"fndir",
	"fnint",
	"fnjmp",
	"fnmin",
	"fnplt",
	"fnrfn",
	"fntlr",
	"fnval",
	"fnxtr",
	"fogpl",
	"formx",
	"fplot",
	"freqs",
	"freqz",
	"fsbvp",
	"fstab",
	"fstat",
	"fsurf",
	"fuzzy",
	"fzero",
	"gabor",
	"gaspl",
	"gc2sc",
	"gcare",
	"gcxgc",
	"gcxsc",
	"gdare",
	"genmu",
	"getff",
	"getiv",
	"getwb",
	"getxo",
	"getzp",
	"gfadd",
	"gfdiv",
	"gfmul",
	"gfsub",
	"gline",
	"globe",
	"gm2dm",
	"gmphd",
	"gmres",
	"gname",
	"gnnew",
	"goode",
	"gpcdf",
	"gpfit",
	"gpinv",
	"gplot",
	"gplus",
	"gppdf",
	"gprnd",
	"graft",
	"gridm",
	"groot",
	"gshhs",
	"gsqrt",
	"gtext",
	"guide",
	"h2lqg",
	"h2syn",
	"hdfan",
	"hdfhd",
	"hdfhe",
	"hdfhx",
	"hdfml",
	"hdfpt",
	"hdfvf",
	"hdfvh",
	"hdfvs",
	"hello",
	"hidem",
	"hist3",
	"hista",
	"histr",
	"hough",
	"hours",
	"hqr10",
	"hsbon",
	"icare",
	"idare",
	"idct2",
	"ident",
	"idpar",
	"idsim",
	"ifft2",
	"ifsst",
	"ifwht",
	"im2bw",
	"imadd",
	"image",
	"imdct",
	"imgca",
	"imgcf",
	"immse",
	"imroi",
	"inmem",
	"input",
	"is2rc",
	"iscom",
	"isdir",
	"isdpx",
	"isenv",
	"isexr",
	"isfis",
	"isicc",
	"isind",
	"ismap",
	"ismcc",
	"isrgb",
	"isstr",
	"istft",
	"km2nm",
	"km2sm",
	"lasso",
	"ldpim",
	"light",
	"linem",
	"lines",
	"linio",
	"lotka",
	"lower",
	"lp2bp",
	"lp2bs",
	"lp2hp",
	"lp2lp",
	"lscov",
	"ltifr",
	"ltiss",
	"ltitf",
	"lyap2",
	"magic",
	"mahal",
	"mbcTQ",
	"mdiag",
	"mean2",
	"meanm",
	"meshc",
	"meshm",
	"meshz",
	"mf2th",
	"mfdlg",
	"mincx",
	"minfo",
	"mksys",
	"mlint",
	"mlock",
	"mmult",
	"mnpdf",
	"mnrnd",
	"month",
	"mpccl",
	"mplay",
	"ms2th",
	"mubnd",
	"muopt",
	"mupad",
	"mussv",
	"musyn",
	"mysql",
	"n2ecc",
	"n4sid",
	"namem",
	"nconv",
	"neo4j",
	"newcf",
	"newff",
	"newga",
	"newpr",
	"newrb",
	"newub",
	"ngrid",
	"nlarx",
	"nm2km",
	"nm2sm",
	"nnGPU",
	"nnMex",
	"norm2",
	"normc",
	"normr",
	"nufft",
	"nugap",
	"obsvf",
	"ocsvm",
	"ode23",
	"ode45",
	"ode78",
	"ode89",
	"opcua",
	"ortho",
	"pass1",
	"pass2",
	"pass3",
	"patch",
	"pause",
	"pburg",
	"pcbin",
	"pccat",
	"pceye",
	"pchip",
	"pcode",
	"pdepe",
	"pdex1",
	"pdex2",
	"pdex3",
	"pdex4",
	"pdex5",
	"pdist",
	"peaks",
	"peqf0",
	"perms",
	"phase",
	"pitch",
	"pivot",
	"place",
	"pload",
	"plomb",
	"plot3",
	"plotm",
	"plotv",
	"pmcov",
	"pmmod",
	"pmode",
	"polar",
	"popov",
	"pp2sp",
	"ppbrk",
	"ppcgr",
	"ppmak",
	"pprfn",
	"ppual",
	"ppval",
	"print",
	"prism",
	"prony",
	"psave",
	"pzmap",
	"qfunc",
	"qpsub",
	"quadl",
	"quadv",
	"quant",
	"radon",
	"randc",
	"randg",
	"rands",
	"range",
	"raypl",
	"rbbox",
	"rc2ac",
	"rc2is",
	"rcbvp",
	"rceps",
	"remez",
	"reset",
	"resi2",
	"resid",
	"rhxrh",
	"ridge",
	"roots",
	"rostf",
	"rot90",
	"rpbrk",
	"rpmak",
	"rsbrk",
	"rscvn",
	"rsdec",
	"rsenc",
	"rsmak",
	"rssnb",
	"rsums",
	"rsval",
	"schmr",
	"schur",
	"sclin",
	"scliv",
	"scmpc",
	"scxsc",
	"sdiag",
	"sectf",
	"seeiv",
	"setwb",
	"sffis",
	"sfgco",
	"sfnew",
	"sfrac",
	"sgrid",
	"showm",
	"sigma",
	"sigmf",
	"sinad",
	"sinfo",
	"sisnr",
	"slice",
	"slmex",
	"sloop",
	"sm2km",
	"sm2nm",
	"smean",
	"smnew",
	"smult",
	"sound",
	"sp2bb",
	"sp2pp",
	"spap2",
	"spapi",
	"spaps",
	"spbrk",
	"spcol",
	"spcrv",
	"spfun",
	"splib",
	"split",
	"splot",
	"splpp",
	"spmak",
	"sprfn",
	"sprpp",
	"spval",
	"sqrtm",
	"sresp",
	"ss2ss",
	"ss2tf",
	"ss2th",
	"ss2zp",
	"ssest",
	"ssinv",
	"starp",
	"stbrk",
	"stcol",
	"stem3",
	"stepz",
	"stmak",
	"stmcb",
	"strel",
	"strip",
	"struc",
	"stval",
	"surfc",
	"surfl",
	"surfm",
	"syscl",
	"sysic",
	"tbase",
	"tchop",
	"textm",
	"tf2ca",
	"tf2cl",
	"tf2ss",
	"tf2zp",
	"tfchk",
	"tfest",
	"tfqmr",
	"th2ff",
	"th2ss",
	"th2tf",
	"th2zp",
	"theme",
	"tiCCS",
	"title",
	"tlc2m",
	"today",
	"tpaps",
	"trace",
	"track",
	"trapz",
	"trdog",
	"trimf",
	"trust",
	"tstat",
	"ttest",
	"turbo",
	"twobc",
	"tzero",
	"udiag",
	"ufind",
	"ufrac",
	"uinfo",
	"uitab",
	"union",
	"unpck",
	"untar",
	"unzip",
	"uplot",
	"upper",
	"vceil",
	"vcond",
	"vconj",
	"vdiag",
	"veval",
	"vexpm",
	"vfind",
	"vgg16",
	"vgg19",
	"vifft",
	"vimag",
	"vldiv",
	"vnorm",
	"vpinv",
	"vplot",
	"vpoly",
	"vrank",
	"vrdiv",
	"vreal",
	"vrsys",
	"vzoom",
	"wetch",
	"wgeom",
	"wheel",
	"which",
	"while",
	"white",
	"width",
	"wsdlg",
	"xcorr",
	"xline",
	"xychk",
	"years",
	"yline",
	"zgrid",
	"zp2ss",
	"zp2tf",
	"ztest"
];
var gameKeys = {
	five: five
};

class FuncleGame extends i {
  static properties = {
    activeRow: { ype: Number },
    dictionaryReady: { type: Boolean }
  };

  static styles = i$3`
    .game {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      align-items: center;
      margin-top: 2rem;
    }
  `;

  constructor() {
    super();
    this.activeRow = 0;
    this.numberOfRows = 6;
    this.dictionaryReady = false;
    this.wordSet = new Set();

    this.code = '';
  }

  async connectedCallback () {
    super.connectedCallback();

    await this._createGame();
  }

  async _createGame () {
    const numKeys = gameKeys.five.length;
    const idx = this._pseudoRandomGen(numKeys);
    this.code = gameKeys.five[idx];
    
    this.wordSet = new Set(gameKeys.five.map(w => w.toLowerCase()));
    this.dictionaryReady = true;
    this.requestUpdate();
  }

  _onGuessEnter(e) {
    const guess = e.detail;

    // Check if guess is a valid function
    if (!this.wordSet.has(guess)) ;

    if (this.activeRow < 4) {
      this.activeRow++;
      this.requestUpdate();
    }
  }

  _pseudoRandomGen (max) {
    const today = new Date().toISOString().slice(0,10); // Just get MDY
    const hash = [...today].reduce((h,c) => (h * 31 + c.charCodeAt(0)) >> 0, 0);

    return (hash % max) + 1;
  }

  render() {

    if (!this.dictionaryReady) {
      return x`<p>Loading ...</p>`;
    }

    return x`
      <div
        class="game"
        @guess-enter=${this._onGuessEnter}
      >
        ${Array.from(Array(this.numberOfRows).keys()).map(i => x`
          <funcle-input-row ?active=${this.activeRow === i}></funcle-input-row>
        `)}
      </div>
    `;
  }
}

customElements.define('funcle-game', FuncleGame);

class FuncleHeader extends i {

    static styles = i$3`
        @font-face {
            font-family: 'Consolas';
            src: url('../fonts/CONSOLA.tff') format('truetype');
            font-weight: normal;
            font-style: normal;
        }

        div {
            font-family: 'Consolas', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    `;

    render() {
        return x`
        <div class="header">
            <h1>funcle</h1>
        </div>
        `;
    }

}

customElements.define('funcle-header', FuncleHeader);

class App extends i {
    render () {
        return x`
            <funcle-header></funcle-header>
            <funcle-game></funcle-game>
        `
    }
}

customElements.define('funcle-app', App);
//# sourceMappingURL=bundle.js.map
