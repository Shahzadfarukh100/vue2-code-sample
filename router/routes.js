import Full from 'Container/Full.vue'

import VersionHistoryViewFactory from '@/components/Widgets/VersionHistoryView'
import KeepAliveSecondary from '@/components/Widgets/KeepAliveSecondary'
// import ViewArchivedNews from '@/views/news_feed/ViewArchivedNews'
// import ListNewsFeed from '@/views/news_feed/ListNewsFeed'

const ListGeneralAbsence = () => import('@/views/absence/ListGeneralAbsence')
// import CreateTicketView from 'Views/helpdesk/secondary/CreateTicketView.vue'
// import TicketDetailView from 'Views/helpdesk/secondary/TicketDetailView.vue'
const EmployeeShiftOvertime = () => import('Views/schedule/secondary/EmployeeShiftOvertime')
const GenericFieldCreateForm = () => import('Views/company/secondary/GenericFieldCreateForm')
const GenericFieldUpdateForm = () => import('Views/company/secondary/GenericFieldUpdateForm')
const ListSwitchDepartments = () => import('Views/departments/ListSwitchDepartments')
const FeedBack = () => import('Views/schedule/secondary/FeedBack')
const ShiftEmployeesAllocated = () => import('Views/schedule/secondary/ShiftEmployeesAllocated.vue')
const EmployeesAllocatedRouter = () => import('Views/schedule/secondary/EmployeesAllocatedRouter.vue')
const EmployeeShiftUpdateRefactor = () => import('Views/schedule/secondary/EmployeeShiftUpdate.vue')
const EmployeeImportDetails = () => import('Views/employees/secondary/EmployeeImportDetails.vue')
const EmployeeImportWithError = () => import('Views/employees/secondary/EmployeeImportWithError.vue')
const CreateShiftSwap = () => import('Views/schedule/secondary/CreateShiftSwap.vue')
const SecondaryEvaluateShiftSwap = () => import('Views/schedule/secondary/EvaluateShiftSwap.vue')
const ScheduleFeedback = () => import('Views/schedule/secondary/ScheduleFeedback.vue')
const DeleteSchedule = () => import('Views/schedule/secondary/DeleteSchedule.vue')
const CustomizeScheduleView = () => import('Views/schedule/secondary/CustomizeScheduleView.vue')
const WeekEditorView = () => import('Views/schedule/secondary/WeekEditorView.vue')
const DeleteShift = () => import('Views/schedule/secondary/DeleteShift.vue')
const FutureShiftsUser = () => import('Views/schedule/secondary/FutureShiftsUser.vue')
// departments
const CreateDepartment = () => import('Views/departments/secondary/CreateDepartment.vue')
const DeleteDepartment = () => import('Views/departments/secondary/DeleteDepartment.vue')
const RestoreDepartment = () => import('Views/departments/secondary/RestoreDepartment.vue')
const UpdateDepartmentWorkingRules = () => import('Views/departments/secondary/UpdateDepartmentWorkingRules.vue')
const TimeSheet = () => import('@/views/schedule/TimeSheet')
const ViewOverTime = () => import('@/views/schedule/ViewOverTime')
const ViewCompany = () => import('@/views/company/ViewCompany')
// chat
// import ChatThreadPlaceholder from 'Views/chat/components/ChatThreadPlaceholder.vue'
// import ChatThread from 'Views/chat/components/ChatThread.vue'
const ChangeDepartment = () => import('@/views/employees/secondary/ChangeDepartment')
const ListResignEmployees = () => import('@/views/employees/ListResignEmployees')
const ChangeRole = () => import('@/views/employees/secondary/ChangeRole')
const UpdateShiftTypes = () => import('@/views/employees/secondary/UpdateShiftTypes')
const ListAbsenceTypeArchive = () => import('@/views/absence/ListAbsenceTypeArchive')
const CreateGeneralAbsence = () => import('@/views/absence/secondary/CreateGeneralAbsence')
const UpdateGeneralAbsence = () => import('@/views/absence/secondary/UpdateGeneralAbsence')
const ViewGeneralAbsence = () => import('@/views/absence/secondary/ViewGeneralAbsence')
const ListGeneralAbsenceArchive = () => import('@/views/absence/ListGeneralAbsenceArchive')

const MultipleReactivateUser = () => import('@/views/employees/secondary/MultipleReactivateUser')
const MultipleDeactivateUser = () => import('@/views/employees/secondary/MultipleDeactivateUser')
// light views
const TodoTaskList = () => import('@/views/todo/TodoTaskList')
const UpdateEmployee = () => import('@/views/employees/secondary/UpdateEmployee')
const ListArchivedDepartments = () => import('@/views/departments/ListArchivedDepartments')
const EmployeeInvite = () => import('@/views/employees/EmployeeInvite')
const ListDesignation = () => import('@/views/designation/ListDesignation')
const CreateDesignation = () => import('@/views/designation/secondary/CreateDesignation')
const UpdateDesignation = () => import('@/views/designation/secondary/UpdateDesignation')
const DeleteDesignation = () => import('@/views/designation/secondary/DeleteDesignation')
const DeleteCompany = () => import('@/views/company/DeleteCompany')
const CompanyDeleteConfirmation = () => import('@/views/company/secondary/CompanyDeleteConfirmation')
const EmployeeLogs = () => import('@/views/activity/EmployeeLogs')
const DepartmentSwitchLogs = () => import('Views/activity/DepartmentSwitchLogs')
const DepartmentSwitchLogsDetails = () => import('Views/activity/secondary/DepartmentSwitchLogsDetails')
const EmployeeResignationLogs = () => import('Views/activity/EmployeeResignationLogs')
const EmployeeRehireLogs = () => import('Views/activity/EmployeeRehireLogs')
const FailedLoginLogs = () => import('Views/activity/FailedLoginLogs')
const LoginLogsDetails = () => import('Views/activity/secondary/LoginLogsDetails')
const ShiftSwapLogsDetails = () => import('Views/activity/secondary/ShiftSwapLogsDetails')
const PasswordResetLogs = () => import('Views/activity/PasswordResetLogs')
const ShiftSwapLogs = () => import('Views/activity/ShiftSwapLogs')
const ShiftAssistantDetails = () => import('Views/schedule/secondary/ShiftAssistantDetails')
const UndoCompany = () => import('Views/company/UndoCompany')
const EditExpectedOvertime = () => import('Views/schedule/secondary/EditExpectedOvertime')
const Reports = () => import('Views/reports/Reports')
const ViewAbsence = () => import('Views/absence/secondary/ViewAbsence')
const DeleteAbsence = () => import('Views/absence/secondary/DeleteAbsence')
const DeleteGeneralAbsence = () => import('Views/absence/secondary/DeleteGeneralAbsence')
const RestoreGeneralAbsence = () => import('Views/absence/secondary/RestoreGeneralAbsence')
const CreateShift = () => import('Views/schedule/secondary/CreateShift.vue')
const EditShift = () => import('Views/schedule/secondary/EditShift.vue')
// schedule

const ShiftDetail = () => import('Views/schedule/secondary/ShiftDetail.vue')
const ScheduleComments = () => import('Views/schedule/secondary/ScheduleComments.vue')
const ShiftComments = () => import('Views/schedule/secondary/ShiftComments.vue')
const ShowMoreItems = () => import('Views/schedule/secondary/ShowMoreItems.vue')
const UpdateShiftTypeSchedules = () => import('Views/shift_types/secondary/UpdateShiftTypeSchedules.vue')
const RestoreArchiveShiftType = () => import('Views/shift_types/secondary/RestoreArchiveShiftType.vue')
const DeleteShiftType = () => import('Views/shift_types/secondary/DeleteShiftType.vue')
const UpdateShiftType = () => import('Views/shift_types/secondary/UpdateShiftType.vue')
const CreateShiftTypeWeekEditor = () => import('Views/shift_types/secondary/CreateShiftTypeWeekEditor.vue')
const ShiTypeAddEmployeesSchedules = () => import('Views/shift_types/secondary/ShiTypeAddEmployeesSchedules.vue')
// shift types
const ShiTypeAddEmployees = () => import('Views/shift_types/secondary/AddEmployees.vue')

const Home = () => import('Views/Home.vue')
const Login = () => import('Views/auth/Login.vue')
const ForgotPassword = () => import('Views/auth/ForgotPassword.vue')
const ResetPassword = () => import('Views/auth/ResetPassword.vue')
const CompleteSignup = () => import('Views/signup/CompleteSignup.vue')
const SignupConsentDetailView = () => import('Views/signup/secondary/SignupConsentDetailView.vue')
const ActivateAccount = () => import('Views/signup/ActivateAccount.vue')
const FourOFour = () => import('Views/error/404.vue')

// employees
const AddEmployee = () => import('Views/employees/secondary/AddEmployee.vue')
const AddAnOtherEmployee = () => import('Views/employees/AddAnOtherEmployee.vue')
const ListEmployees = () => import('Views/employees/ListEmployees.vue')
const ListEmployeesWorkingToday = () => import('Views/employees/ListEmployeesWorkingToday.vue')
const ReactivateUser = () => import('Views/employees/secondary/ReactivateUser.vue')
const EmployeeProfile = () => import('Views/employees/EmployeeProfile.vue')
const AccountSettings2 = () => import('Views/profile_settings/AccountSettings2.vue')
const TwoFactor = () => import('Views/employees/TwoFactor.vue')
const BulkImport = () => import('Views/employees/BulkImport.vue')
const ListEmployeesImported = () => import('Views/employees/ListEmployeesImported.vue')

// preferences
const WeekdayUpdate = () => import('Views/preferences/WeekdayUpdate.vue')
const ShiftTypeUpdate = () => import('Views/preferences/ShiftTypeUpdate.vue')
const ScheduleUpdate = () => import('Views/preferences/ScheduleUpdate.vue')

// departments
const ListDepartments = () => import('Views/departments/ListDepartments.vue')

// shift types
const CreateShiftType = () => import('Views/shift_types/secondary/CreateShiftType.vue')
const ListShiftTypes = () => import('Views/shift_types/ListShiftTypes.vue')
const ListArchiveShiftTypes = () => import('Views/shift_types/ListArchiveShiftTypes.vue')

// schedule
const CreateSchedule = () => import('Views/schedule/CreateSchedule.vue')
const ViewSchedule = () => import('Views/schedule/ViewSchedule.vue')
const ListSchedules = () => import('Views/schedule/ListSchedules.vue')
const StopCollectingPreferencesSchedule = () => import('Views/schedule/secondary/StopCollectingPreferencesSchedule.vue')

// absence
const CreateAbsence = () => import('Views/absence/secondary/CreateAbsence.vue')
const UpdateAbsencePending = () => import('Views/absence/secondary/UpdateAbsencePending.vue')
const UpdateAbsenceType = () => import('../views/absence/secondary/UpdateAbsenceType')
const DeleteAbsenceType = () => import('../views/absence/secondary/DeleteAbsenceType')
const RestoreAbsenceTypes = () => import('../views/absence/secondary/RestoreAbsenceTypes')
const CreateAbsenceType = () => import('../views/absence/secondary/CreateAbsenceType')
// absences
const ListAbsences = () => import('Views/absence/ListAbsences.vue')
const ListAbsencesType = () => import('Views/absence/ListAbsencesType.vue')

// shift swap

const EvaluateShiftSwap = () => import('Views/shift_swap/EvaluateShiftSwap.vue')
const ListShiftSwapMarket = () => import('Views/shift_swap/ListShiftSwapMarket.vue')
const DeleteShiftSwap = () => import('Views/shift_swap/secondary/DeleteShiftSwap.vue')
const UpdateShiftSwap = () => import('Views/shift_swap/secondary/UpdateShiftSwap.vue')
const ShiftAllocate = () => import('Views/shift_swap/secondary/ShiftAllocate.vue')
const DetailShiftSwap = () => import('Views/shift_swap/secondary/DetailShiftSwap.vue')
const UpdateShiftSwapRouter = () => import('Views/shift_swap/secondary/UpdateShiftSwapRouter.vue')
const DeclareInterestShiftSwap = () => import('Views/shift_swap/secondary/DeclareInterestShiftSwap.vue')

// notification

const NotificationsList = () => import('Views/notifications/NotificationsList.vue')

// news feed

// const CreateNewsFeed = () => import('Views/news_feed/CreateNewsFeed.vue')
// const ViewNewsFeed = () => import('Views/news_feed/ViewNewsFeed.vue')

// help desk
// const HelpdeskListVue = () => import('Views/helpdesk/ListView.vue')

// consent
const ConsentListView = () => import('Views/consent/ConsentListView.vue')
const ConsentDetailView = () => import('Views/consent/ConsentDetailView.vue')

export default [
  {
    path: '/',
    component: Full,
    children: [
      {
        path: '/',
        component: Home,
        name: 'HOME',
        meta: {
          loginRequired: true,
          title: 'message.HOME',
          group: 'home'
        }
      },
      { path: '/employee/add-another',
        component: AddAnOtherEmployee,
        name: 'EMPLOYEE_ADD_ANOTHER'
      },

      {
        path: '/employee/activity',
        component: EmployeeLogs,
        name: 'EMPLOYEE_LOGS',
        meta: {
          loginRequired: true,
          title: 'message.EMPLOYEE_LOGS',
          group: 'employees'
        }
      },

      {
        path: '/employees-working-today',
        component: ListEmployeesWorkingToday,
        name: 'EMPLOYEES_WORKING_TODAY',
        meta: {
          loginRequired: true,
          title: 'message.EMPLOYEES_WORKING_TODAY',
          group: 'employees'
        }
      },
      {
        path: '/employees',
        component: ListEmployees,
        name: 'EMPLOYEE_LIST',
        meta: {
          loginRequired: true,
          permission: 'can_list_employee',
          title: 'message.ALL_EMPLOYEES',
          group: 'employees',
          basePattern: /\/employees/g
        },
        children: [

          {
            path: 'add',
            component: AddEmployee,
            name: 'EMPLOYEE_LIST:EMPLOYEE_ADD',
            meta: {
              loginRequired: true,
              secondary: true,
              title: 'message.ADD_EMPLOYEE',
              group: 'employees',
              permission: 'can_create_employee'
            }
          },

          {
            path: ':employeeId/update',
            component: UpdateEmployee,
            name: 'EMPLOYEE_LIST:EMPLOYEE_UPDATE',
            meta: {
              loginRequired: true,
              title: 'message.UPDATE_EMPLOYEE',
              secondary: true,
              group: 'employees',
              permission: 'can_create_employee'
            }
          },

          {
            path: 'create-designation',
            component: CreateDesignation,
            name: 'EMPLOYEE_LIST:ADD_DESIGNATION',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'employees',
              permission: 'can_create_designation'
            }
          },
          {
            path: 'create-department',
            component: CreateDepartment,
            name: 'EMPLOYEE_LIST:DEPARTMENT_CREATE',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'employees',
              permission: 'can_create_department'
            }
          },

          {
            path: 'switch-department',
            component: ListSwitchDepartments,
            name: 'EMPLOYEE_LIST:SWITCH_DEPARTMENT',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: ':employeeId/change_department/',
            component: ChangeDepartment,
            name: 'EMPLOYEE_LIST:CHANGE_DEPARTMENT',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'employees',
              permission: 'can_update_department'
            }
          },
          {
            path: ':employeeId/change_role/',
            component: ChangeRole,
            name: 'EMPLOYEE_LIST:CHANGE_ROLE',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'employees',
              backBtnType: 'close'
            },
            props: r => ({ role: r.params.role })
          },

          {
            path: ':employeeId/update-shift-types/',
            component: UpdateShiftTypes,
            name: 'EMPLOYEE_LIST:UPDATE_SHIFT_TYPE',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'employees',
              permission: 'can_update_employee_shift_type'
            }
          },
          {
            path: ':employeeId/history/',
            component: VersionHistoryViewFactory('employee', 'message.EMPLOYEE_HISTORY', 'employeeId'),
            name: 'EMPLOYEE_LIST:EMPLOYEE_HISTORY',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'employees'
            }
          },

          {
            path: '/employees/deactivate_users',
            component: EmployeesAllocatedRouter,
            children: [
              {
                path: '',
                component: MultipleDeactivateUser,
                name: 'EMPLOYEE_LIST:DEACTIVATE_USERS',
                meta: {
                  loginRequired: true,
                  secondary: true,
                  group: 'employees'
                }
              },
              {
                path: ':employeeId/future-shifts/',
                component: FutureShiftsUser,
                name: 'EMPLOYEE_LIST:FUTURE_SHIFTS_USERS',
                meta: {
                  loginRequired: true,
                  secondary: true,
                  group: 'employees'
                }
              }
            ]
          }
        ]
      },
      // logs
      {
        path: '/department/switch/logs/',
        component: DepartmentSwitchLogs,
        name: 'DEPARTMENT_SWITCH_LOGS',
        meta: {
          permission: 'can_list_department_switch_logs',
          loginRequired: true,
          title: 'message.DEPARTMENT_SWITCH_LOGS',
          basePattern: /\/department\/switch\/logs/g
        },
        children: [
          {
            path: ':objectId/',
            component: DepartmentSwitchLogsDetails,
            name: 'DEPARTMENT_SWITCH_LOGS:DETAILS',
            meta: {
              loginRequired: true,
              secondary: true,
              permission: 'can_retrieve_department_switch_logs'
            }
          }
        ]
      },
      {
        path: '/employee/logs/resignation/',
        component: EmployeeResignationLogs,
        name: 'EMPLOYEE_RESIGNATION_LOGS',
        meta: {
          permission: 'can_list_employee_resignation_logs',
          loginRequired: true,
          title: 'message.EMPLOYEE_RESIGNATION_LOGS'
        }
      },
      {
        path: '/employee/logs/rehire/',
        component: EmployeeRehireLogs,
        name: 'EMPLOYEE_REHIRE_LOGS',
        meta: {
          permission: 'can_list_employee_rehire_logs',
          loginRequired: true,
          title: 'message.EMPLOYEE_REHIRE_LOGS'
        }
      },
      {
        path: '/employee/logs/failed_login/',
        component: FailedLoginLogs,
        name: 'LOGIN_FAILED_LOGS',
        meta: {
          loginRequired: true,
          title: 'message.LOGIN_FAILED_LOGS'
        }
      },
      {
        path: 'employee/logs/password_reset',
        component: PasswordResetLogs,
        name: 'PASSWORD_RESET_LOGS',
        meta: {
          loginRequired: true,
          title: 'message.PASSWORD_RESET_LOGS'
        }
      },
      {
        path: 'shift/swap/logs',
        component: ShiftSwapLogs,
        name: 'SHIFT_SWAP_LOGS',
        meta: {
          loginRequired: true,
          title: 'message.SHIFT_SWAP_LOGS',
          basePattern: /\/shift\/swap\/logs/g
        },
        children: [
          {
            path: ':objectId/',
            component: ShiftSwapLogsDetails,
            name: 'SHIFT_SWAP_LOGS:DETAILS',
            meta: {
              loginRequired: true,
              secondary: true
            }
          }
        ]
      },
      {
        path: '/employees/import',
        component: BulkImport,
        name: 'EMPLOYEE_IMPORT',
        meta: {
          loginRequired: true,
          permission: 'can_create_employee',
          title: 'message.IMPORT_EMPLOYEES',
          group: 'employees',
          basePattern: /\/employees\/import/g
        },
        children: [
          {
            path: ':id/',
            component: EmployeeImportDetails,
            name: 'EMPLOYEE_IMPORT:DETAILS',
            meta: {
              loginRequired: true,
              secondary: true
            },
            props: r => ({ object: r.params.object })
          },
          {
            path: 'errors',
            component: EmployeeImportWithError,
            name: 'EMPLOYEE_IMPORT:WITH_ERROR',
            meta: {
              loginRequired: true,
              secondary: true
            },
            props: r => ({ objects: r.params.objects })
          }
        ]
      },
      {
        path: '/employees/imported',
        component: ListEmployeesImported,
        name: 'EMPLOYEE_IMPORTED',
        meta: {
          loginRequired: true,
          title: 'message.IMPORTED_EMPLOYEES',
          group: 'employees'
        }
      },
      {
        path: '/employees/invitation',
        component: EmployeeInvite,
        name: 'INVITE_EMPLOYEES',
        meta: {
          loginRequired: true,
          layout: true,
          permission: 'can_invite_employee',
          title: 'message.INVITE_EMPLOYEES',
          group: 'employees'
        }
      },
      {
        path: '/employees/resign',
        component: ListResignEmployees,
        name: 'EMPLOYEE_LIST_RESIGN',
        meta: {
          loginRequired: true,
          permission: 'can_create_employee',
          title: 'message.RESIGNED_EMPLOYEE',
          group: 'employees',
          basePattern: /\/employees\/resign/g
        },
        children: [
          {
            path: ':employeeId/rehire/:departmentId/',
            component: ReactivateUser,
            name: 'EMPLOYEE_LIST_RESIGN:REHIRE',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: ':employeeId/change_department/',
            component: ChangeDepartment,
            name: 'EMPLOYEE_LIST_RESIGN:CHANGE_DEPARTMENT',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'departments',
              permission: 'can_update_department'
            }
          },
          {
            path: 'switch-department',
            component: ListSwitchDepartments,
            name: 'EMPLOYEE_LIST_RESIGN:SWITCH_DEPARTMENT',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: '/employees/resign/reactivate_users',
            component: MultipleReactivateUser,
            name: 'EMPLOYEE_LIST_RESIGN:REACTIVATE_USERS',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'employees'
            }
          }
        ]
      },

      {
        path: '/employees/:objectId',
        component: EmployeeProfile,
        name: 'EMPLOYEE_PROFILE',
        meta: {
          loginRequired: true,
          title: 'message.EMPLOYEE',
          group: 'employees',
          basePattern: /\/employees\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g
        },
        children: [
          {
            path: 'history',
            component: VersionHistoryViewFactory('preference_for_shift_type', 'message.PREFERENCE_SHIFT_TYPE_HISTORY', 'employeeId'),
            name: 'EMPLOYEE_PROFILE:PREFERENCE_SHIFT_TYPE',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: 'history',
            component: VersionHistoryViewFactory('preference_for_weekday', 'message.PREFERENCE_WEEK_DAY_HISTORY', 'employeeId'),
            name: 'EMPLOYEE_PROFILE:PREFERENCE_WEEK_DAY',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: 'employee-shift/:employeeShiftId/',
            component: EmployeeShiftUpdateRefactor,
            name: 'EMPLOYEE_PROFILE:EMPLOYEE_SHIFT_UPDATE',
            meta: {
              loginRequired: true,
              secondary: true
            },
            props: r => ({ employeeShiftId: r.params.employeeShiftId })
          },
          {
            path: ':absenceId/view',
            component: ViewAbsence,
            name: 'EMPLOYEE_PROFILE:ABSENCE_VIEW',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: ':generalAbsenceId/view',
            component: ViewGeneralAbsence,
            name: 'EMPLOYEE_PROFILE:GENERAL_ABSENCE_VIEW',
            meta: {
              loginRequired: true,
              secondary: true
            }
          }
        ]
      },

      {
        path: '/settings/:objectId',
        component: AccountSettings2,
        name: 'ACCOUNT_SETTINGS',
        meta: {
          loginRequired: true,
          layout: true,
          title: 'message.ACCOUNT_SETTINGS',
          group: 'employees'
        },
        children: [
          {
            path: 'history',
            component: VersionHistoryViewFactory('preference_for_shift_type', 'message.PREFERENCE_SHIFT_TYPE_HISTORY', 'employeeId'),
            name: 'ACCOUNT_SETTINGS:PREFERENCE_SHIFT_TYPE',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: 'history',
            component: VersionHistoryViewFactory('preference_for_weekday', 'message.PREFERENCE_WEEK_DAY_HISTORY', 'employeeId'),
            name: 'ACCOUNT_SETTINGS:PREFERENCE_WEEK_DAY',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: 'employee-shift/:employeeShiftId/',
            component: EmployeeShiftUpdateRefactor,
            name: 'ACCOUNT_SETTINGS:EMPLOYEE_SHIFT_UPDATE',
            meta: {
              loginRequired: true,
              secondary: true
            },
            props: r => ({ employeeShiftId: r.params.employeeShiftId })
          },
          {
            path: ':absenceId/view',
            component: ViewAbsence,
            name: 'ACCOUNT_SETTINGS:ABSENCE_VIEW',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: ':generalAbsenceId/view',
            component: ViewGeneralAbsence,
            name: 'ACCOUNT_SETTINGS:GENERAL_ABSENCE_VIEW',
            meta: {
              loginRequired: true,
              secondary: true
            }
          }
        ]
      },

      {
        path: '/two-factor',
        component: TwoFactor,
        name: 'TWO_FACTOR_SETUP',
        meta: {
          loginRequired: true,
          title: 'message.TWO_FACTOR_SETUP',
          group: 'employees'
        }
      },

      // preferences
      {
        path: '/preferences/weekday',
        component: WeekdayUpdate,
        name: 'WEEKDAY_PREFERENCES_UPDATE',
        meta: {
          loginRequired: true,
          layout: true,
          title: 'message.UPDATE_WEEKDAY_PREFERENCES',
          group: 'home'
        }
      },

      {
        path: '/preferences/shift-type',
        component: ShiftTypeUpdate,
        name: 'SHIFT_TYPE_PREFERENCES_UPDATE',
        meta: {
          loginRequired: true,
          title: 'message.UPDATE_SHIFT_TYPE_PREFERENCES',
          group: 'home'
        }
      },

      {
        path: '/preferences/schedule/:scheduleId',
        component: ScheduleUpdate,
        name: 'SCHEDULE_PREFERENCES_UPDATE',
        meta: {
          loginRequired: true,
          title: 'message.UPDATE_SCHEDULE_PREFERENCES',
          group: 'home'
        }
      },
      // company
      {
        path: '/company',
        component: ViewCompany,
        name: 'COMPANY_DETAIL',
        meta: {
          loginRequired: true,
          title: 'message.COMPANY',
          group: 'company',
          layout: true,
          permission: 'can_retrieve_company',
          basePattern: /\/company/g
        },
        children: [
          {
            path: ':companyId/history',
            component: VersionHistoryViewFactory('company', 'message.COMPANY_HISTORY', 'companyId'),
            name: 'COMPANY_DETAIL:COMPANY_HISTORY',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'company'
            }
          },
          {
            path: 'settings/general/:companyId/history',
            component: VersionHistoryViewFactory('company/settings/general', 'message.COMPANY_GENERAL_SETTING_HISTORY', 'companyId'),
            name: 'COMPANY_DETAIL:COMPANY_GENERAL_SETTING',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: 'settings/employee/:companyId/history',
            component: VersionHistoryViewFactory('company/settings/general', 'message.COMPANY_EMPLOYEE_SETTING_HISTORY', 'companyId'),
            name: 'COMPANY_DETAIL:COMPANY_EMPLOYEE_SETTING',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: 'generic-fields/create/',
            component: GenericFieldCreateForm,
            name: 'COMPANY_DETAIL:GENERIC_FIELDS_CREATE',
            meta: {
              loginRequired: true,
              secondary: true,
              permission: 'can_create_generic_field'
            }
          },
          {
            path: 'generic-fields/:genericFieldId/update/',
            component: GenericFieldUpdateForm,
            name: 'COMPANY_DETAIL:GENERIC_FIELDS_UPDATE',
            meta: {
              loginRequired: true,
              secondary: true,
              permission: 'can_create_generic_field'
            }
          },

          {
            path: 'delete/:companyId',
            component: CompanyDeleteConfirmation,
            name: 'COMPANY_DETAIL:COMPANY_DELETE',
            meta: {
              loginRequired: true,
              secondary: true,
              permission: 'can_delete_company'
            }
          }

        ]
      },
      {
        path: '/company_deleted/:company/delete',
        component: DeleteCompany,
        name: 'DELETE_COMPANY',
        meta: {
          loginRequired: true,
          title: 'message.DELETE_COMPANY'
        }
      },
      {
        path: '/company_deleted/:company',
        component: UndoCompany,
        name: 'UNDO_COMPANY',
        meta: {
          title: 'message.UNDO_COMPANY'
        }
      },
      // todoList
      {
        path: '/todos',
        component: TodoTaskList,
        name: 'TODO_LIST',
        meta: {
          loginRequired: true,
          title: 'message.TODO_TASK',
          group: 'todos',
          basePattern: /\/todos/g
        }
      },
      // designation
      {
        path: '/job-titles',
        component: ListDesignation,
        name: 'DESIGNATION_LIST',
        meta: {
          loginRequired: true,
          title: 'message.JOB_TITLE',
          group: 'designations',
          permission: 'can_view_designation',
          basePattern: /\/job-titles/g
        },
        children: [
          {
            path: 'create',
            component: CreateDesignation,
            name: 'DESIGNATION_LIST:ADD_DESIGNATION',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'designations',
              permission: 'can_create_designation'
            }
          },
          {
            path: 'update/:designationId',
            component: UpdateDesignation,
            name: 'DESIGNATION_LIST:UPDATE_DESIGNATION',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'designations',
              permission: 'can_update_designation'
            }
          },
          {
            path: ':objectId/delete',
            component: DeleteDesignation,
            name: 'DESIGNATION_LIST:DELETE_DESIGNATION',
            meta: {
              loginRequired: true,
              permission: 'can_delete_designation',
              secondary: true,
              group: 'designations'
            }
          },
          {
            path: ':designationId/history',
            component: VersionHistoryViewFactory('designation', 'message.DESIGNATION_HISTORY', 'designationId'),
            name: 'DESIGNATION_LIST:DESIGNATION_HISTORY',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'designations'
            }
          }
        ]
      },

      // departments
      {
        path: '/departments',
        component: ListDepartments,
        name: 'DEPARTMENT_LIST',
        meta: {
          loginRequired: true,
          title: 'message.DEPARTMENTS',
          group: 'departments',
          permission: 'can_view_department',
          basePattern: /\/departments/g
        },
        children: [
          {
            path: 'create',
            component: CreateDepartment,
            name: 'DEPARTMENT_LIST:DEPARTMENT_CREATE',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'departments',
              permission: 'can_create_department'
            }
          },
          {
            path: 'update/:objectId',
            component: CreateDepartment,
            name: 'DEPARTMENT_LIST:DEPARTMENT_UPDATE',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'departments',
              permission: 'can_update_department'
            }
          },
          {
            path: ':employeeId/change_department/',
            component: ChangeDepartment,
            name: 'DEPARTMENT_LIST:CHANGE_DEPARTMENT',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'departments',
              permission: 'can_update_department'
            }
          },
          {
            path: 'delete/:objectId',
            component: DeleteDepartment,
            name: 'DEPARTMENT_LIST:DEPARTMENT_DELETE',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'departments',
              permission: 'can_destroy_department'
            }
          },
          {
            path: 'update-department-working-rules/:objectId',
            component: UpdateDepartmentWorkingRules,
            name: 'DEPARTMENT_LIST:DEPARTMENT_WORKING_RULES_UPDATE',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'departments',
              permission: 'can_update_department'
            }
          },
          {
            path: ':departmentId/history',
            component: VersionHistoryViewFactory('department', 'message.DEPARTMENT_HISTORY', 'departmentId'),
            name: 'DEPARTMENT_LIST:DEPARTMENT_HISTORY',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'departments'
            }
          }
        ]
      },
      {
        path: '/department/archived',
        component: ListArchivedDepartments,
        name: 'ARCHIVED_DEPARTMENT_LIST',
        meta: {
          loginRequired: true,
          title: 'message.ARCHIVED',
          group: 'departments',
          permission: 'can_list_archived_department'
        },
        children: [
          {
            path: 'restore/:objectId',
            component: RestoreDepartment,
            name: 'DEPARTMENT_LIST:DEPARTMENT_RESTORE',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'departments',
              permission: 'can_restore_department'
            }
          }
        ]
      },
      {
        path: '/shift-type',
        component: ListShiftTypes,
        name: 'SHIFT_TYPE_LIST',
        meta: {
          loginRequired: true,
          title: 'message.SHIFT_TYPES',
          group: 'shift_type',
          permission: 'can_view_shift_type',
          basePattern: /\/shift-type/g
        },
        children: [
          {
            path: 'create',
            component: KeepAliveSecondary,
            children: [
              {
                path: '',
                component: CreateShiftType,
                name: 'SHIFT_TYPE_LIST:SHIFT_TYPE_CREATE',
                meta: {
                  title: 'message.CREATE_NEW_SHIFT_TYPE',
                  permission: 'can_create_shift_type',
                  loginRequired: true,
                  secondary: true,
                  backBtnType: 'close'
                }
              },
              {
                path: 'edit-week',
                component: CreateShiftTypeWeekEditor,
                name: 'SHIFT_TYPE_CREATE:EDIT_WEEK',
                meta: {
                  loginRequired: true,
                  secondary: true,
                  permission: 'can_create_shift_type',
                  backBtnType: 'close'
                }
              },
              {
                path: 'create-department',
                component: CreateDepartment,
                name: 'SHIFT_TYPE_CREATE:DEPARTMENT_CREATE',
                meta: {
                  loginRequired: true,
                  secondary: true,
                  permission: 'can_create_department'
                }
              }
            ]
          },
          {
            path: 'switch-department',
            component: ListSwitchDepartments,
            name: 'SHIFT_TYPE_LIST:SWITCH_DEPARTMENT',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: ':id/update',
            component: UpdateShiftType,
            name: 'SHIFT_TYPE_LIST:UPDATE_SHIFT_TYPE',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'shift_type',
              permission: 'can_update_shift_type',
              backBtnType: 'close'
            }
          },
          {
            path: ':id/delete/',
            component: DeleteShiftType,
            name: 'SHIFT_TYPE_LIST:DELETE_SHIFT_TYPE',
            meta: {
              loginRequired: true,
              permission: 'can_delete_shift_type',
              secondary: true
            }
          },
          {
            path: ':id/update-shift-type-schedules',
            component: UpdateShiftTypeSchedules,
            name: 'SHIFT_TYPE_LIST:UPDATE_SHIFT_TYPE_SCHEDULES',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'shift_type',
              permission: 'can_update_shift_type'
            }
          },
          {
            path: ':id/employees',
            component: ShiTypeAddEmployees,
            name: 'SHIFT_TYPE_LIST:SHIFT_TYPE_ADD_EMPLOYEE',
            meta: {
              loginRequired: true,
              secondary: true,
              permission: 'can_update_shift_type'
            }
          },
          {
            path: ':id/employees-shift-type-schedules',
            component: ShiTypeAddEmployeesSchedules,
            name: 'SHIFT_TYPE_LIST:SHIFT_TYPE_ADD_EMPLOYEE_SCHEDULES',
            meta: {
              loginRequired: true,
              secondary: true,
              permission: 'can_update_shift_type'
            }
          },
          {
            path: ':shiftTypeId/history',
            component: VersionHistoryViewFactory('shift_type', 'message.SHIFT_TYPE_HISTORY', 'shiftTypeId'),
            name: 'SHIFT_TYPE_LIST:SHIFT_TYPE_HISTORY',
            meta: {
              loginRequired: true,
              secondary: true
            }
          }
        ]
      },
      {
        path: '/archive-shift-type',
        component: ListArchiveShiftTypes,
        name: 'ARCHIVE_SHIFT_TYPE_LIST',
        meta: {
          loginRequired: true,
          title: 'message.ARCHIVE_SHIFT_TYPES',
          permission: 'can_view_shift_type',
          basePattern: /\/archive-shift-type/g
        },
        children: [
          {
            path: ':id/restore/',
            component: RestoreArchiveShiftType,
            name: 'ARCHIVE_SHIFT_TYPE_LIST:RESTORE_ARCHIVE_SHIFT_TYPE',
            meta: {
              loginRequired: true,
              permission: 'can_delete_shift_type',
              secondary: true
            }
          }
        ]
      },

      // schedule

      {
        path: '/schedule',
        component: ListSchedules,
        name: 'SCHEDULE_LIST',
        meta: {
          loginRequired: true,
          title: 'message.SCHEDULES',
          group: 'schedule',
          basePattern: /\/schedule/g
        },
        children: [
          {
            path: 'switch-department',
            component: ListSwitchDepartments,
            name: 'SCHEDULE_LIST:SWITCH_DEPARTMENT',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: ':scheduleId/feedback/',
            component: ScheduleFeedback,
            name: 'SCHEDULE_LIST:SCHEDULE_FEEDBACK',
            meta: {
              loginRequired: true,
              permission: 'can_view_schedule_feedback',
              secondary: true
            }
          },

          {
            path: ':id/delete/',
            component: DeleteSchedule,
            name: 'SCHEDULE_LIST:SCHEDULE_DELETE',
            meta: {
              loginRequired: true,
              permission: 'can_delete_schedule',
              secondary: true
            }
          },

          {
            path: ':id/stop-collecting-preferences/',
            component: StopCollectingPreferencesSchedule,
            name: 'SCHEDULE_LIST:STOP_COLLECTING_PREFERENCES',
            meta: {
              loginRequired: true,
              permission: 'can_stop_collecting_preferences',
              secondary: true
            }
          },

          {
            path: ':scheduleId/history/',
            component: VersionHistoryViewFactory('schedule', 'message.SCHEDULE_HISTORY', 'scheduleId'),
            name: 'SCHEDULE_LIST:SCHEDULE_HISTORY',
            meta: {
              loginRequired: true,
              secondary: true
            }
          }
        ]
      },

      {
        path: '/schedule/create',
        component: CreateSchedule,
        name: 'SCHEDULE_CREATE',
        meta: {
          loginRequired: true,
          title: 'message.CREATE_SCHEDULE',
          layout: true,
          group: 'schedule',
          permission: 'can_create_schedule',
          basePattern: /\/schedule\/create/g
        },
        children: [
          {
            path: 'customize',
            component: CustomizeScheduleView,
            name: 'SCHEDULE_CREATE:CUSTOMIZE',
            meta: {
              loginRequired: true,
              secondary: true,
              permission: 'can_create_schedule'
            }
          },
          {
            path: 'customize/editor',
            component: WeekEditorView,
            name: 'SCHEDULE_CREATE:CUSTOMIZE_EDITOR',
            meta: {
              loginRequired: true,
              secondary: true,
              permission: 'can_create_schedule'
            }
          },
          {
            path: 'create-department',
            component: CreateDepartment,
            name: 'SCHEDULE_CREATE:DEPARTMENT_CREATE',
            meta: {
              loginRequired: true,
              secondary: true,
              permission: 'can_create_department'
            }
          },
          {
            path: 'create-shift-type',
            component: CreateShiftType,
            name: 'SCHEDULE_CREATE:SHIFT_TYPE_CREATE',
            meta: {
              loginRequired: true,
              secondary: true,
              permission: 'can_create_shift_type'
            }
          }
        ]
      },
      {
        path: '/schedule/:id/expected_overtimes',
        component: ViewOverTime,
        name: 'VIEW_OVERTIME',
        meta: {
          loginRequired: true,
          title: 'message.VIEW_OVERTIME',
          group: 'schedule',
          basePattern: /\/schedule\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/expected_overtimes/g
        },
        children: [
          {
            path: 'edit/:employeeShiftId/',
            component: EditExpectedOvertime,
            name: 'VIEW_OVERTIME:OVERTIME_EDIT',
            meta: {
              loginRequired: true,
              secondary: true
            }
          }
        ]
      },
      {
        path: '/schedule/:id/timesheet',
        component: TimeSheet,
        name: 'TIMESHEET',
        meta: {
          loginRequired: true,
          title: 'message.TIMESHEET',
          group: 'schedule',
          basePattern: /\/schedule\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/timesheet/g
        },
        children: [
          {
            path: 'employee-shift/:employeeShiftId/',
            component: EmployeeShiftUpdateRefactor,
            name: 'TIMESHEET:EMPLOYEE_SHIFT_UPDATE',
            meta: {
              loginRequired: true,
              secondary: true
            },
            props: r => ({ employeeShiftId: r.params.employeeShiftId, reloadTimeSheet: true })
          },

          {
            path: 'employee-shift/:employeeShiftId/history',
            component: VersionHistoryViewFactory('employee_shift', 'message.EMPLOYEE_SHIFT_HISTORY', 'employeeShiftId'),
            name: 'TIMESHEET:EMPLOYEE_SHIFT_HISTORY',
            meta: {
              loginRequired: true,
              secondary: true
            }
          }
        ]
      },
      {
        path: '/schedule/:id',
        component: ViewSchedule,
        name: 'SCHEDULE_DETAIL',
        meta: {
          loginRequired: true,
          title: 'message.SCHEDULE',
          group: 'schedule',
          basePattern: /\/schedule\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g
        },
        children: [
          {
            path: 'show-more-items',
            component: ShowMoreItems,
            name: 'SCHEDULE_DETAIL:SHOW_MORE_ITEMS',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },

          {
            path: 'shift-detail/:shiftId',
            component: ShiftDetail,
            name: 'SCHEDULE_DETAIL:SHIFT_DETAIL_VIEW',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },

          {
            path: 'schedule-comments/',
            component: ScheduleComments,
            name: 'SCHEDULE_DETAIL:SCHEDULE_COMMENTS',
            meta: {
              loginRequired: true,
              secondary: true,
              backBtnType: 'close'
            }
          },
          {
            path: 'shift-comments/:shiftId',
            component: ShiftComments,
            name: 'SCHEDULE_DETAIL:SHIFT_COMMENTS',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: 'feedback',
            component: FeedBack,
            name: 'SCHEDULE_DETAIL:SCHEDULE_FEEDBACK',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: 'shift-detail/:shiftId/edit/',
            component: EditShift,
            name: 'SCHEDULE_DETAIL:SHIFT_UPDATE',
            meta: {
              loginRequired: true,
              permission: 'can_update_shift',
              secondary: true,
              hideBackBtn: true
            }
          },
          {
            path: 'shift-detail/:shiftId/employees-allocated/',
            component: EmployeesAllocatedRouter,
            children: [
              {
                path: '',
                name: 'SCHEDULE_DETAIL:SHIFT_EMPLOYEES_ALLOCATED',
                component: ShiftEmployeesAllocated,
                meta: {
                  permission: 'can_update_shift',
                  secondary: true,
                  loginRequired: true
                }
              },
              {
                path: ':employeeId/shift-assistant-detail',
                component: ShiftAssistantDetails,
                name: 'SCHEDULE_DETAIL:SHIFT_ASSISTANT_DETAIL',
                meta: {
                  permission: 'can_update_shift',
                  secondary: true,
                  loginRequired: true
                }
              }
            ]
          },
          {
            path: 'shift-swap-details/:shiftSwapId',
            component: DetailShiftSwap,
            name: 'SCHEDULE_DETAIL:SHIFT_SWAP_DETAIL',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: 'shift-swap-delete/:shiftSwapId',
            component: DeleteShiftSwap,
            name: 'SCHEDULE_DETAIL:SHIFT_SWAP_DELETE',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: 'shift/:shiftId/history',
            component: VersionHistoryViewFactory('shift', 'message.SHIFT_HISTORY', 'shiftId'),
            name: 'SCHEDULE_DETAIL:SHIFT_HISTORY',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: 'shift/:shiftId/history',
            component: VersionHistoryViewFactory('shift_swap', 'message.SHIFT_SWAP_HISTORY', 'shiftId'),
            name: 'SCHEDULE_DETAIL:SHIFT_SWAP_HISTORY',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: 'shift/create/',
            component: CreateShift,
            name: 'SCHEDULE_DETAIL:SHIFT_CREATE',
            meta: {
              loginRequired: true,
              permission: 'can_create_shift',
              secondary: true
            }
          },
          {
            path: 'shift/:shiftId/edit/',
            component: EditShift,
            name: 'SCHEDULE_DETAIL:SHIFT_UPDATE',
            meta: {
              loginRequired: true,
              permission: 'can_update_shift',
              secondary: true
            }
          },
          {
            path: 'shift-detail/employee/:employeeShiftId/',
            component: EmployeeShiftUpdateRefactor,
            name: 'SCHEDULE_DETAIL:EMPLOYEE_SHIFT_UPDATE_REFACTOR',
            meta: {
              loginRequired: true,
              secondary: true
            },
            props: r => ({ employeeShiftId: r.params.employeeShiftId })
          },

          {
            path: 'employee_shift/:employeeShiftId/overtime',
            component: EmployeeShiftOvertime,
            name: 'SCHEDULE_DETAIL:EMPLOYEE_SHIFT_OVERTIME',
            meta: {
              loginRequired: true,
              secondary: true
            },
            props: r => ({ employeeShiftId: r.params.employeeShiftId })
          },
          {
            path: 'overtime/:overtimeId/history',
            component: VersionHistoryViewFactory('overtime', 'message.OVERTIME_HISTORY', 'overtimeId'),
            name: 'SCHEDULE_DETAIL:OVERTIME_HISTORY',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: 'employee-shift/:employeeShiftId/history',
            component: VersionHistoryViewFactory('employee_shift', 'message.EMPLOYEE_SHIFT_HISTORY', 'employeeShiftId'),
            name: 'SCHEDULE_DETAIL:EMPLOYEE_SHIFT_HISTORY',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: 'shift/:shiftId/swap/',
            component: CreateShiftSwap,
            name: 'SCHEDULE_DETAIL:SHIFT_SWAP_CREATE',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: 'shift-swap/:objectId/evaluate/',
            component: SecondaryEvaluateShiftSwap,
            name: 'SCHEDULE_DETAIL:SHIFT_SWAP_UPDATE',
            meta: {
              loginRequired: true,
              permission: 'can_update_shift_swap',
              secondary: true
            }
          },
          {
            path: 'shift-delete/:shiftId',
            component: DeleteShift,
            name: 'SCHEDULE_DETAIL:SHIFT_DELETE',
            meta: {
              loginRequired: true,
              secondary: true,
              permission: 'can_delete_shift'
            }
          },
          {
            path: 'stop-collecting-preferences/',
            component: StopCollectingPreferencesSchedule,
            name: 'SCHEDULE_DETAIL:STOP_COLLECTING_PREFERENCES',
            meta: {
              loginRequired: true,
              permission: 'can_stop_collecting_preferences',
              secondary: true
            }
          }
        ]
      },
      {
        path: '/absences',
        component: ListAbsences,
        name: 'ABSENCE_LIST',
        meta: {
          loginRequired: true,
          title: 'message.ABSENCE',
          permission: 'can_view_absence',
          group: 'absences',
          basePattern: /\/absences/g
        },
        children: [
          {
            path: 'create',
            component: CreateAbsence,
            name: 'ABSENCE_LIST:ABSENCE_CREATE',
            meta: {
              loginRequired: true,
              permission: 'can_create_absence',
              secondary: true,
              group: 'absences'
            }
          },
          {
            path: 'create-for-other',
            component: CreateAbsence,
            name: 'ABSENCE_LIST:ABSENCE_CREATE_FOR_OTHER',
            meta: {
              loginRequired: true,
              permission: 'can_create_absence',
              secondary: true,
              group: 'absences'
            },
            props: r => ({ absenceForOther: true })
          },
          {
            path: ':objectId/update-status',
            component: UpdateAbsencePending,
            name: 'ABSENCE_LIST:ABSENCE_STATUS_UPDATE',
            meta: {
              loginRequired: true,
              permission: 'can_update_status',
              secondary: true,
              group: 'absences'
            }
          },
          {
            path: ':objectId/view',
            component: ViewAbsence,
            name: 'ABSENCE_LIST:ABSENCE_VIEW',
            meta: {
              loginRequired: true,
              permission: 'can_view_absence',
              secondary: true,
              group: 'absences'
            }
          },

          {
            path: 'employee-shift/:employeeShiftId/',
            component: EmployeeShiftUpdateRefactor,
            name: 'ABSENCE_LIST:EMPLOYEE_SHIFT_UPDATE',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'absences'
            },
            props: r => ({ employeeShiftId: r.params.employeeShiftId })
          },
          {
            path: ':objectId/delete',
            component: DeleteAbsence,
            name: 'ABSENCE_LIST:ABSENCE_DELETE',
            meta: {
              loginRequired: true,
              permission: 'can_delete_absence',
              secondary: true,
              group: 'absences'
            }
          },
          {
            path: ':objectId/history',
            component: VersionHistoryViewFactory('absence', 'message.ABSENCE_HISTORY', 'objectId'),
            name: 'ABSENCE_LIST:ABSENCE_HISTORY',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'absences'
            }
          }
        ]
      },
      {
        path: '/general-absence',
        component: ListGeneralAbsence,
        name: 'GENERAL_ABSENCE_LIST',
        meta: {
          loginRequired: true,
          title: 'message.GENERAL_ABSENCE_LIST',
          permission: 'can_list_general_absence',
          group: 'absences',
          basePattern: /\/general-absence/g
        },
        children: [
          {
            path: 'create',
            component: CreateGeneralAbsence,
            name: 'GENERAL_ABSENCE_LIST:GENERAL_ABSENCE_CREATE',
            meta: {
              loginRequired: true,
              permission: 'can_create_general_absence',
              secondary: true,
              group: 'absences'
            }
          },
          {
            path: ':generalAbsenceId/update',
            component: UpdateGeneralAbsence,
            name: 'GENERAL_ABSENCE_LIST:GENERAL_ABSENCE_UPDATE',
            meta: {
              loginRequired: true,
              permission: 'can_update_general_absence',
              secondary: true,
              group: 'absences'
            }
          },
          {
            path: ':generalAbsenceId/view',
            component: ViewGeneralAbsence,
            name: 'GENERAL_ABSENCE_LIST:GENERAL_ABSENCE_VIEW',
            meta: {
              loginRequired: true,
              permission: 'can_retrieve_general_absence',
              secondary: true,
              group: 'absences'
            }
          },
          {
            path: ':generalAbsenceId/delete',
            component: DeleteGeneralAbsence,
            name: 'GENERAL_ABSENCE_LIST:ABSENCE_DELETE',
            meta: {
              loginRequired: true,
              permission: 'can_delete_general_absence',
              secondary: true,
              group: 'absences'
            }
          }
        ]
      },
      {
        path: '/general-absence-archived',
        component: ListGeneralAbsenceArchive,
        name: 'GENERAL_ABSENCE_ARCHIVED',
        meta: {
          loginRequired: true,
          title: 'message.ARCHIVED',
          permission: 'can_list_archived_general_absence',
          group: 'general-absence',
          basePattern: /\/general-absence-archived/g
        },
        children: [
          {
            path: ':generalAbsenceId/restore',
            component: RestoreGeneralAbsence,
            name: 'GENERAL_ABSENCE_ARCHIVED:ABSENCE_RESTORE',
            meta: {
              loginRequired: true,
              permission: 'can_restore_archived_general_absence',
              secondary: true,
              group: 'general-absence'
            }
          }
        ]
      },
      {
        path: '/absences-type',
        component: ListAbsencesType,
        name: 'ABSENCE_TYPE',
        meta: {
          loginRequired: true,
          title: 'message.ABSENCE_TYPE',
          permission: 'can_view_absence_type',
          group: 'absences',
          basePattern: /\/absences-type/g
        },
        children: [
          {
            path: 'create',
            component: CreateAbsenceType,
            name: 'ABSENCE_TYPE:ABSENCE_TYPE_CREATE',
            meta: {
              loginRequired: true,
              permission: 'can_create_absence_type',
              secondary: true,
              group: 'absences'
            }
          },
          {
            path: ':absenceTypeId/update',
            component: UpdateAbsenceType,
            name: 'ABSENCE_TYPE:ABSENCE_TYPE_UPDATE',
            meta: {
              loginRequired: true,
              permission: 'can_update_absence_type',
              secondary: true,
              group: 'absences'
            }
          },
          {
            path: ':absenceTypeId/delete',
            component: DeleteAbsenceType,
            name: 'ABSENCE_TYPE:ABSENCE_TYPE_DELETE',
            meta: {
              loginRequired: true,
              permission: 'can_delete_absence_type',
              secondary: true,
              group: 'absences'
            }
          }
        ]
      },
      {
        path: '/absences-type-archived',
        component: ListAbsenceTypeArchive,
        name: 'ABSENCE_TYPE_ARCHIVED',
        meta: {
          loginRequired: true,
          title: 'message.ARCHIVED',
          permission: 'can_list_archived_absence_type',
          group: 'absences-type-archived',
          basePattern: /\/absences-type-archived/g
        },
        children: [
          {
            path: ':absenceTypeId/restore',
            component: RestoreAbsenceTypes,
            name: 'ABSENCE_TYPE_ARCHIVED:ABSENCE_TYPE_RESTORE',
            meta: {
              loginRequired: true,
              permission: 'can_restore_absence_type',
              secondary: true,
              group: 'absences-type-archived'
            }
          }
        ]
      },
      // shift swap

      {
        path: '/shift-swap/:objectId/evaluate',
        component: EmployeesAllocatedRouter,
        children: [
          {
            path: '',
            name: 'SHIFT_SWAP_UPDATE',
            component: EvaluateShiftSwap,
            meta: {
              title: 'message.EVALUATE_SHIFT_SWAP',
              layout: true,
              loginRequired: true,
              permission: 'can_update_shift_swap',
              group: 'shift-swap'
            },
            children: [
              {
                path: ':shiftId/:employeeId/shift-assistant-detail',
                component: ShiftAssistantDetails,
                name: 'SHIFT_SWAP_UPDATE:ASSISTANT_DETAIL',
                meta: {
                  permission: 'can_update_shift_swap',
                  secondary: true,
                  loginRequired: true
                }
              }
            ]
          }
        ]
      },

      {
        path: '/shift-swap-market/',
        component: ListShiftSwapMarket,
        name: 'LIST_SHIFT_SWAP_MARKET',
        meta: {
          title: 'message.SHIFT_SWAP_MARKET',
          loginRequired: true,
          group: 'shift-swap',
          basePattern: /\/shift-swap-market/g
        },
        children: [
          {
            path: ':shiftSwapId/details',
            component: DetailShiftSwap,
            name: 'LIST_SHIFT_SWAP_MARKET:SHIFT_SWAP_MARKET_DETAIL',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'shift-swap'
            }
          },
          {
            path: 'switch-department',
            component: ListSwitchDepartments,
            name: 'LIST_SHIFT_SWAP_MARKET:SWITCH_DEPARTMENT',
            meta: {
              loginRequired: true,
              secondary: true
            }
          },
          {
            path: ':objectId/declare-interest',
            component: DeclareInterestShiftSwap,
            name: 'LIST_SHIFT_SWAP_MARKET:SHIFT_SWAP_MARKET_DECLARE_INTEREST',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'shift-swap'
            }
          },
          {
            path: ':shiftSwapId/delete',
            component: DeleteShiftSwap,
            name: 'LIST_SHIFT_SWAP_MARKET:SHIFT_SWAP_MARKET_DELETE',
            meta: {
              loginRequired: true,
              secondary: true,
              group: 'shift-swap'
            }
          },

          {
            path: ':objectId/update/:shiftId/',
            component: UpdateShiftSwapRouter,
            children: [
              {
                path: '',
                name: 'LIST_SHIFT_SWAP_MARKET:SHIFT_SWAP_MARKET_UPDATE',
                component: UpdateShiftSwap,
                meta: {
                  loginRequired: true,
                  secondary: true,
                  group: 'shift-swap'
                }
              },
              {
                path: 'shift-allocate',
                name: 'LIST_SHIFT_SWAP_MARKET:SHIFT_SWAP_MARKET_SHIFT_ALLOCATE',
                component: ShiftAllocate,
                meta: {
                  loginRequired: true,
                  secondary: true,
                  group: 'shift-swap'
                }
              },
              {
                path: ':employeeId/shift-assistant-detail',
                component: ShiftAssistantDetails,
                name: 'LIST_SHIFT_SWAP_MARKET:SHIFT_ASSISTANT_DETAIL',
                meta: {
                  permission: 'can_update_shift_swap',
                  secondary: true,
                  loginRequired: true
                }
              }
            ]
          }

        ]
      },

      // notification

      {
        path: '/notifications',
        component: NotificationsList,
        name: 'NOTIFICATION_LIST',
        meta: {
          title: 'message.ALL_NOTIFICATIONS',
          loginRequired: true,
          group: 'home'
        }
      },

      // reports

      {
        path: '/reports',
        component: Reports,
        name: 'REPORTS',
        meta: {
          loginRequired: true,
          title: 'message.REPORTS',
          group: 'reports',
          permission: 'can_list_employee_shift'
        }
      },
      // help-desk
      // {
      //   path: '/helpdesk',
      //   component: HelpdeskListVue,
      //   name: 'HELPDESK_LIST',
      //   meta: {
      //     loginRequired: true,
      //     title: 'message.HELP_DESK',
      //     group: 'helpdesk',
      //     basePattern: /\/helpdesk/g
      //   },
      //   children: [
      //     {
      //       path: 'create-ticket',
      //       component: CreateTicketView,
      //       name: 'HELPDESK_LIST:CREATE_TICKET',
      //       meta: {
      //         loginRequired: true,
      //         secondary: true
      //       }
      //     },
      //     {
      //       path: 'ticket/:id',
      //       component: TicketDetailView,
      //       name: 'HELPDESK_LIST:TICKET_DETAIL',
      //       meta: {
      //         loginRequired: true,
      //         secondary: true
      //       }
      //     }
      //   ]
      // },
      // // news feed
      // {
      //   path: '/news/archive',
      //   component: ViewArchivedNews,
      //   name: 'NEWS_FEED_ARCHIVE',
      //   meta: {
      //     title: 'message.ARCHIVED',
      //     loginRequired: true,
      //     group: 'news',
      //     permission: 'can_list_archived_news_feed'
      //   }
      // },
      // {
      //   path: '/news/list',
      //   component: ListNewsFeed,
      //   name: 'LIST_NEWS_FEED',
      //   meta: {
      //     title: 'message.LIST_NEWS_FEED',
      //     loginRequired: true,
      //     group: 'news',
      //     permission: 'can_list_news_feed',
      //     basePattern: /\/news\/list/g
      //   },
      //   children: [
      //     {
      //       path: 'create',
      //       component: CreateNewsFeed,
      //       name: 'LIST_NEWS_FEED:NEWS_FEED_CREATE',
      //       meta: {
      //         title: 'message.CREATE_NEWS',
      //         loginRequired: true,
      //         group: 'news',
      //         secondary: true,
      //         permission: 'can_create_news_feed'
      //       }
      //     },
      //     {
      //       path: ':newsFeedId/history',
      //       component: VersionHistoryViewFactory('news_feed', 'message.NEWS_FEED_HISTORY', 'newsFeedId'),
      //       name: 'LIST_NEWS_FEED:NEWS_FEED_HISTORY',
      //       meta: {
      //         loginRequired: true,
      //         secondary: true,
      //         group: 'news'
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: '/news/:newsFeedId',
      //   component: ViewNewsFeed,
      //   name: 'NEWS_FEED_DETAIL',
      //   meta: {
      //     title: 'message.NEWS_DETAIL',
      //     loginRequired: true,
      //     group: 'news'
      //   }
      // },
      // chat

      // {
      //   path: '/chat',
      //   component: () => import('Views/chat/Chat.vue'),
      //   meta: {
      //     title: 'message.CHAT',
      //     loginRequired: true,
      //     group: 'home'
      //   },
      //   children: [
      //     {
      //       path: '',
      //       component: ChatThreadPlaceholder,
      //       name: 'CHAT',
      //       meta: {
      //         title: 'message.CHAT',
      //         loginRequired: true
      //       }
      //     },
      //     {
      //       path: ':threadId',
      //       component: ChatThread,
      //       name: 'CHAT:CHAT_THREAD',
      //       meta: {
      //         title: 'message.CHAT',
      //         loginRequired: true
      //       }
      //     }
      //   ]
      // },
      {
        path: '/activity/login/',
        component: () => import('Views/activity/LoginLogs.vue'),
        name: 'LOGIN_ACTIVITY',
        meta: {
          title: 'message.LOGIN_ACTIVITY',
          loginRequired: true,
          basePattern: /\/activity\/login/g
        },
        children: [
          {
            path: ':objectId/',
            component: LoginLogsDetails,
            name: 'LOGIN_ACTIVITY:DETAILS',
            meta: {
              loginRequired: true,
              secondary: true
            }
          }
        ]
      },
      {
        path: '/consent',
        component: ConsentListView,
        name: 'CONSENT_LIST',
        meta: {
          loginRequired: true,
          title: 'message.CONSENT_LIST'
        }
      },
      {
        path: '/consent/:objectId',
        component: ConsentDetailView,
        name: 'CONSENT_DETAIL',
        meta: {
          loginRequired: true,
          title: 'message.CONSENT_DETAIL'
        }
      }

    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'LOGIN',
    meta: {
      loginRequired: false,
      title: 'message.LOGIN'
    }
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
    name: 'FORGOT_PASSWORD',
    meta: {
      loginRequired: false,
      title: 'message.RECOVER_YOUR_ACCOUNT_PASSWORD'
    }
  },
  {
    path: '/reset-password',
    component: ResetPassword,
    name: 'RESET_PASSWORD',
    meta: {
      loginRequired: false,
      title: 'message.RECOVER_YOUR_ACCOUNT_PASSWORD'
    }
  },
  {
    path: '/complete-signup/:uuid',
    component: CompleteSignup,
    name: 'SIGNUP_COMPLETE',
    meta: {
      loginRequired: false,
      title: 'message.COMPLETE_YOUR_SIGNUP',
      basePattern: /\/complete-signup\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g
    },
    children: [
      {
        path: 'consent/:objectId',
        component: SignupConsentDetailView,
        name: 'SIGNUP_COMPLETE:CONSENT_DETAIL',
        meta: {
          loginRequired: false,
          secondary: true,
          title: 'message.CONSENT_DETAIL'
        }
      }
    ]
  },

  {
    path: '/activate-account/',
    component: ActivateAccount,
    name: 'ACCOUNT_ACTIVATE',
    meta: {
      loginRequired: false,
      title: 'message.ACTIVATE_YOUR_ACCOUNT'
    }
  },
  {
    path: '/lost',
    component: FourOFour,
    name: '404',
    meta: {
      loginRequired: false,
      title: 'message.COMPLETE_YOUR_SIGNUP'
    }
  },
  {
    path: '*',
    component: FourOFour,
    redirect: '/lost'
  }
]
