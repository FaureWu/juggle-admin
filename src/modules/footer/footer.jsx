import React, {
  PureComponent,
} from 'react';

import styles from './footer.scss';

class Footer extends PureComponent {
  render() {
    return (
      <div className={styles.footer}>
        Juggle Admin - <a href="https://github.com/FaureWu/juggle-admin.git">Github</a>
      </div>
    );
  }
}

export default Footer;
