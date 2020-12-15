import { connect } from 'react-redux';

import SignIn from '../../components/SignIn';
import { setLocale } from '../../store/actions';

const mapStateToProps = (state: { locale: string }) => ({
  locale: state.locale,
});
const mapDispatchToProps = (dispatch: Function) => ({
  setLocale: (val: string) => dispatch(setLocale(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
